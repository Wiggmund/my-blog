import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PostsService} from './posts.service';
import {Post as PostModel} from './models/post.model';
import {User} from '../users/models/user.model';
import {Reaction} from '../reactions/models/reaction.model';
import {HashTag} from '../hashtags/models/hashtag.model';
import {CreatePostDto} from './dto/create-post.dto';
import {AddRemoveReactionDto} from '../reactions/dto/add-remove-reaction.dto';
import {AddRemoveHashTagDto} from '../hashtags/dto/add-remove-hashTag.dto';
import {AddRemoveUserDto} from '../users/dto/add-remove-user.dto';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtRolesGuard } from 'src/auth/guards/jwt-roles.guard';

@Roles('ADMIN')
@UseGuards(JwtRolesGuard)
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
	constructor(
		private postsService: PostsService
	) {}

	@ApiOperation({description: 'Retrieve all posts'})
	@ApiResponse({status: 200, type: [PostModel]})
	@Get()
	getAllPosts() {
		return this.postsService.getAllPosts();
	}

	@ApiOperation({description: 'Get post by id'})
	@ApiResponse({status: 200, type: PostModel})
	@Get(':id')
	getPostById(@Param('id') id: number) {
		return this.postsService.getPostById(id);
	}

	@ApiOperation({description: 'Retrieve all users for specific post'})
	@ApiResponse({status: 200, type: [User]})
	@Get(':id/users')
	getPostUsers(@Param('id') id: number) {
		return this.postsService.getPostUsers(id);
	}

	@ApiOperation({description: 'Retrieve all reactions for specific post'})
	@ApiResponse({status: 200, type: [Reaction]})
	@Get(':id/reactions')
	getPostReactions(@Param('id') id: number) {
		return this.postsService.getPostReactions(id);
	}

	@ApiOperation({description: 'Retrieve all hashTags for specific post'})
	@ApiResponse({status: 200, type: [HashTag]})
	@Get(':id/hashTags')
	getPostHashTags(@Param('id') id: number) {
		return this.postsService.getPostHashTags(id);
	}

	@ApiOperation({description: 'Create new post'})
	@ApiResponse({status: 200, type: PostModel})
	@UsePipes(ValidationPipe)
	@Post()
	createPost(@Body() postDto: CreatePostDto) {
		return this.postsService.createPost(postDto);
	}

	@ApiOperation({description: 'Add or increment (if this reaction exists) specific reaction for post with given id'})
	@ApiResponse({status: 200, type: PostModel})
	@UsePipes(ValidationPipe)
	@Post('add/reaction')
	addOrIncrementReaction(@Body() addReactionDto: AddRemoveReactionDto) {
		return this.postsService.addOrIncrementReaction(addReactionDto);
	}

	@ApiOperation({description: 'Remove or decrement (if this reaction exists) specific reaction for post with given id'})
	@ApiResponse({status: 200, type: PostModel})
	@UsePipes(ValidationPipe)
	@Post('remove/reaction')
	removeOrDecrementReaction(@Body() removeReactionDto: AddRemoveReactionDto) {
		return this.postsService.removeOrDecrementReaction(removeReactionDto);
	}

	@ApiOperation({description: 'Add specific hashtag for post with given id'})
	@ApiResponse({status: 200, type: PostModel})
	@UsePipes(ValidationPipe)
	@Post('add/hashTag')
	addHashTag(@Body() addHashTagDto: AddRemoveHashTagDto) {
		return this.postsService.addHashTag(addHashTagDto);
	}

	@ApiOperation({description: 'Remove specific hashtag for post with given id'})
	@ApiResponse({status: 200, type: PostModel})
	@UsePipes(ValidationPipe)
	@Post('remove/hashTag')
	removeHashTag(@Body() removeHashTagDto: AddRemoveHashTagDto) {
		return this.postsService.removeHashTag(removeHashTagDto);
	}

	@ApiOperation({description: 'Add author for post with given id'})
	@ApiResponse({status: 200, type: PostModel})
	@UsePipes(ValidationPipe)
	@Post('add/user')
	addUser(@Body() addUserDto: AddRemoveUserDto) {
		return this.postsService.addUser(addUserDto);
	}

	@ApiOperation({description: 'Remove author for post with given id'})
	@ApiResponse({status: 200, type: PostModel})
	@UsePipes(ValidationPipe)
	@Post('remove/user')
	removeUser(@Body() addUserDto: AddRemoveUserDto) {
		return this.postsService.removeUser(addUserDto);
	}
}
