import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Post} from './models/post.model';
import {User} from '../users/models/user.model';
import {Reaction} from '../reactions/models/reaction.model';
import {HashTag} from '../hashtags/models/hashtag.model';
import {CreatePostDto} from './dto/create-post.dto';
import {AddRemoveReactionDto} from '../reactions/dto/add-remove-reaction.dto';
import {ReactionsService} from '../reactions/reactions.service';
import {PostsReactions} from './models/posts-reactions.model';
import {UsersService} from '../users/users.service';
import {AddRemoveHashTagDto} from '../hashtags/dto/add-remove-hashTag.dto';
import {HashtagsService} from '../hashtags/hashtags.service';
import {AddRemoveUserDto} from '../users/dto/add-remove-user.dto';


@Injectable()
export class PostsService {
	constructor(
		@InjectModel(Post) private postModel,
		@InjectModel(PostsReactions) private postsReactionsModel,
		private reactionsService: ReactionsService,
		private usersService: UsersService,
		private hashTagsService: HashtagsService
	) {}

	async getAllPosts(): Promise<Post> {
		return this.postModel.findAll();
	}

	async getPostById(id: number): Promise<Post> {
		return this.postModel.findByPk(id);
	}

	async getPostUsers(id: number): Promise<User[]> {
		return (await this.postModel.findByPk(id, {include: User})).users;
	}

	async getPostReactions(id: number): Promise<Reaction[]> {
		const reactions = (await this.postModel.findByPk(id,
			{
				include: {
					model: Reaction,
					attributes: ['id', 'reaction'],
					through: {attributes: ['quantity']}}
			}
		)).reactions;

		return reactions.map((item) => {
			return {
				id: item.id,
				reaction: item.reaction,
				quantity: item.PostsReactions.quantity
			};
		});
	}

	async getPostHashTags(id: number): Promise<HashTag[]> {
		return (await this.postModel.findByPk(id,
			{
				include: {
					model: HashTag,
					attributes: ['id', 'hashTag'],
					through: {attributes: []}}
			}
		)).hashTags;
	}

	async createPost(postDto: CreatePostDto): Promise<Post> {
		const {userId, ...createDto} = postDto;
		const newPost = await this.postModel.create(createDto);

		const user = await this.usersService.getUserById(userId);
		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		await newPost.$add('users', user);
		return newPost;
	}

	async deletePost(id: number) {
		return this.postModel.destroy({where: {id}});
	}

	async addOrIncrementReaction(addReactionDto: AddRemoveReactionDto): Promise<Post> {
		const {post, reaction} = await this.getPostAndReactionOrThrow(addReactionDto);

		const condition = {
			postId: post.id,
			reactionId: reaction.id
		};

		const postsReactionsEntry = await this.postsReactionsModel.findOne({where: condition})

		if (postsReactionsEntry) {
			postsReactionsEntry.quantity++;
			await postsReactionsEntry.save();
			return post;
		}

		await post.$add('reactions', reaction);
		return post;
	}

	async removeOrDecrementReaction(removeReactionDto: AddRemoveReactionDto): Promise<Post> {
		const {post, reaction} = await this.getPostAndReactionOrThrow(removeReactionDto);

		const condition = {
			postId: post.id,
			reactionId: reaction.id
		};

		const postsReactionsEntry = await this.postsReactionsModel.findOne({where: condition})
		// If nothing increment, just do nothing
		if (!postsReactionsEntry) {
			return post;
		}

		--postsReactionsEntry.quantity === 0 ?
			await post.$remove('reactions', reaction) :
			await postsReactionsEntry.save();

		return post;
	}

	async addHashTag(addHashTagDto: AddRemoveHashTagDto): Promise<Post> {
		const {post, hashTag} = await this.getPostAndHashTagOrThrow(addHashTagDto);
		await post.$add('hashTags', hashTag);
		return post;
	}

	async removeHashTag(removeHashTagDto: AddRemoveHashTagDto): Promise<Post> {
		const {post, hashTag} = await this.getPostAndHashTagOrThrow(removeHashTagDto);
		await post.$remove('hashTags', hashTag);
		return post;
	}

	async addUser(addUserDto: AddRemoveUserDto): Promise<Post> {
		const {post, user} = await this.getPostAndUserOrThrow(addUserDto);

		await post.$add('users', user);
		return post;
	}

	async removeUser(removeUserDto: AddRemoveUserDto): Promise<Post> {
		const {post, user} = await this.getPostAndUserOrThrow(removeUserDto);

		await post.$remove('users', user);
		return post;
	}

	private async getPostOrThrow (dto: {postId: number}): Promise<Post> {
		const post = await this.getPostById(dto.postId);
		if (!post) {
			throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
		}

		return post;
	}

	private async getPostAndUserOrThrow(dto: AddRemoveUserDto): Promise<{post: Post, user: User}> {
		const post = await this.getPostOrThrow(dto);
		const user = await this.usersService.getUserById(dto.userId);
		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		return {post, user};
	}

	private async getPostAndReactionOrThrow(dto: AddRemoveReactionDto): Promise<{post: Post, reaction: Reaction}> {
		const post = await this.getPostOrThrow(dto);

		const reaction = await this.reactionsService.getReactionByValue(dto.reaction);
		if (!reaction) {
			throw new HttpException('Reaction not found', HttpStatus.NOT_FOUND);
		}

		return {post, reaction};
	}

	private async getPostAndHashTagOrThrow(dto: AddRemoveHashTagDto): Promise<{post: Post, hashTag: HashTag}> {
		const post = await this.getPostOrThrow(dto);

		let hashTag = await this.hashTagsService.getHashTagByValue(dto.hashTag);
		if (!hashTag) {
			hashTag = await this.hashTagsService.createHashTag({
				hashTag: dto.hashTag
			});
		}

		return {post, hashTag};
	}

}
