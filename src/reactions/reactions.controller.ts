import {Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {ReactionsService} from './reactions.service';
import {CreateReactionDto} from './dto/create-reaction.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Reaction} from './models/reaction.model';
import {Post as PostModel} from '../posts/models/post.model';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtRolesGuard } from '../auth/guards/jwt-roles.guard';

@Roles('ADMIN')
@UseGuards(JwtRolesGuard)
@ApiTags('Reactions')
@Controller('reactions')
export class ReactionsController {
	constructor(
		private reactionsService: ReactionsService
	) {}

	@ApiOperation({description: 'Get all reactions'})
	@ApiResponse({status: 200, type: [Reaction]})
	@Get()
	getAllReactions() {
		return this.reactionsService.getAllReactions();
	}

	@ApiOperation({description: 'Get reaction by id'})
	@ApiResponse({status: 200, type: Reaction})
	@Get(':id')
	getReactionById(@Param('id') id: number) {
		return this.reactionsService.getReactionById(id);
	}

	@ApiOperation({description: 'Get posts which have this reaction id'})
	@ApiResponse({status: 200, type: [PostModel]})
	@Get(':id/posts')
	getReactionPosts(@Param('id') id: number) {
		return this.reactionsService.getReactionPosts(id);
	}

	@ApiOperation({description: 'Create reaction'})
	@ApiResponse({status: 200, type: Reaction})
	@UsePipes(ValidationPipe)
	@Post()
	createReaction(@Body() createReactionDto: CreateReactionDto) {
		return this.reactionsService.createReaction(createReactionDto);
	}

	@ApiOperation({description: 'Remove reaction'})
	@ApiResponse({status: 200, type: Number, description: 'Returns number of deleted reactions'})
	@UsePipes(ValidationPipe)
	@Delete()
	removeReaction(@Body() removeReactionDto: CreateReactionDto) {
		return this.reactionsService.removeReaction(removeReactionDto.reaction);
	}
}
