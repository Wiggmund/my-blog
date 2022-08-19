import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ReactionsService} from './reactions.service';
import {CreateReactionDto} from './dto/create-reaction.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Reaction} from './models/reaction.model';
import {Post as PostModel} from '../posts/models/post.model';

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
	@Post()
	createReaction(@Body() createReactionDto: CreateReactionDto) {
		return this.reactionsService.createReaction(createReactionDto);
	}

	@ApiOperation({description: 'Remove reaction'})
	@ApiResponse({status: 200, type: Reaction})
	@Post('remove')
	removeReaction(@Body() removeReactionDto: CreateReactionDto) {
		return this.reactionsService.removeReaction(removeReactionDto.reaction);
	}
}
