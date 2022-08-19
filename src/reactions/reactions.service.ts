import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Reaction} from './models/reaction.model';
import {CreateReactionDto} from './dto/create-reaction.dto';
import {UtilsService} from '../utils/utils.service';
import {Post} from '../posts/models/post.model';

@Injectable()
export class ReactionsService {
	constructor(
		@InjectModel(Reaction) private reactionModel,
		private utilsService: UtilsService
	) {}

	async getAllReactions(): Promise<Reaction[]> {
		return this.reactionModel.findAll();
	}

	async getReactionById(id: number): Promise<Reaction> {
		return this.reactionModel.findByPk(id);
	}

	async getReactionPosts(reactionId: number): Promise<Post[]> {
		const reaction = await this.getReactionById(reactionId);
		if (!reaction) {
			throw new HttpException('Reaction not found', HttpStatus.NOT_FOUND);
		}

		return reaction.$get('posts');
	}

	async getReactionByValue(reaction: string): Promise<Reaction> {
		return this.reactionModel.findOne(
			{
				where: {
					reaction: this.utilsService.makeSafeLowerString(reaction)}
			}
		);
	}

	async createReaction(createReactionDto: CreateReactionDto): Promise<Reaction> {
		return this.reactionModel.create(
			{
				reaction: this.utilsService.makeSafeLowerString(createReactionDto.reaction)
			}
		);
	}

	async removeReaction(reaction: string): Promise<boolean> {
		await this.reactionModel.destroy(
			{
				where: {
					reaction: this.utilsService.makeSafeLowerString(reaction)}
			}
		);
		return true;
	}
}
