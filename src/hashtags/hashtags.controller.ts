import {Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {HashtagsService} from './hashtags.service';
import {CreateHashTagDto} from './dto/create-hashTag.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {HashTag} from './models/hashtag.model';
import {Post as PostModel} from '../posts/models/post.model';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtRolesGuard } from '../auth/guards/jwt-roles.guard';

@Roles('ADMIN')
@UseGuards(JwtRolesGuard)
@ApiTags('HashTags')
@Controller('hashtags')
export class HashtagsController {
	constructor(
		private hashTagsService: HashtagsService
	) {}

	@ApiOperation({description: 'Get all hashTags'})
	@ApiResponse({status: 200, type: [HashTag]})
	@Get()
	getAllHashTags() {
		return this.hashTagsService.getAllHashTags();
	}

	@ApiOperation({description: 'Get hashTag by id'})
	@ApiResponse({status: 200, type: HashTag})
	@Get(':id')
	getHashTagById(@Param('id') id: number) {
		return this.hashTagsService.getHashTagById(id);
	}

	@ApiOperation({description: 'Get posts which have this hashTag id'})
	@ApiResponse({status: 200, type: [PostModel]})
	@Get(':id/posts')
	getHashTagPosts(@Param('id') id: number) {
		return this.hashTagsService.getHashTagPosts(id);
	}

	@ApiOperation({description: 'Create hashTag'})
	@ApiResponse({status: 200, type: HashTag})
	@UsePipes(ValidationPipe)
	@Post()
	createHashTag(@Body() hasTagDto: CreateHashTagDto) {
		return this.hashTagsService.createHashTag(hasTagDto);
	}

	@ApiOperation({description: 'Remove hashTag'})
	@ApiResponse({status: 200, type: Number, description: 'Returns number of deleted hashtags'})
	@UsePipes(ValidationPipe)
	@Delete()
	removeHashTag(@Body() hasTagDto: CreateHashTagDto) {
		return this.hashTagsService.removeHashTag(hasTagDto);
	}
}
