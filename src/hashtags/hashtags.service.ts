import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateHashTagDto} from './dto/create-hashTag.dto';
import {InjectModel} from '@nestjs/sequelize';
import {HashTag} from './models/hashtag.model';
import {UtilsService} from '../utils/utils.service';
import {Post} from '../posts/models/post.model';

@Injectable()
export class HashtagsService {
	constructor(
		@InjectModel(HashTag) private hashTagModel,
		private utilsService: UtilsService
	) {}

	async getAllHashTags() {
		return this.hashTagModel.findAll();
	}

	async getHashTagById(id: number): Promise<HashTag> {
		return this.hashTagModel.findByPk(id);
	}

	async getHashTagPosts(hashTagId: number): Promise<Post[]> {
		const hashTag = await this.getHashTagById(hashTagId);
		if (!hashTag) {
			throw new HttpException('HashTag not found', HttpStatus.NOT_FOUND);
		}

		return hashTag.$get('posts');
	}

	async getHashTagByValue(hashTag: string) {
		return this.hashTagModel.findOne(
			{where: {hashTag: this.utilsService.makeTrimmed(hashTag)}})
	}

	async createHashTag(hashTagDto: CreateHashTagDto) {
		return this.hashTagModel.create(
			{
				...hashTagDto,
				hashTag: this.utilsService.makeTrimmed(hashTagDto.hashTag)
			});
	}

	async removeHashTag(hashTagDto: CreateHashTagDto) {
		return this.hashTagModel.destroy({where: {hashTag: hashTagDto.hashTag}});
	}
}
