import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNotEmpty } from "class-validator";
import { randomUUID } from "crypto";
import * as sharp from "sharp";
import { numberVal } from "src/share/data-type-helper";
import { Like, Repository } from "typeorm";
import { PhotoEntity } from "./photo.entity";

interface CreatePhotoInput {
	profilId: string;
	binaryFile: Buffer;
	originalName: string;
	mediaType: string;
}

export class UploadImageDto {
	@IsNotEmpty()
	profilId!: string;
}

@Injectable()
export class PhotoService {
	constructor(
		@InjectRepository(PhotoEntity)
		private readonly photoRepository: Repository<PhotoEntity>,
	) {}

	async create({ binaryFile, originalName, profilId, mediaType }: CreatePhotoInput) {
		const uid = randomUUID();
		const { height, weightB, width } = await this.#getImageInfo(binaryFile);

		const photo = await this.photoRepository.save({
			uid,
			height,
			width,
			weightB,
			mediaType,
			binaryFile,
			originalName,
			profilId,
		});

		return photo;
	}

	async findOne({ uid, extension }: { uid: string; extension: string }) {
		return await this.photoRepository.findOneOrFail({
			where: { uid, mediaType: Like(`%${extension}`) },
		});
	}
	async #getImageInfo(binaryFile: Buffer) {
		const metadata = await sharp(binaryFile).metadata();

		return {
			height: numberVal(metadata.height),
			width: numberVal(metadata.width),
			weightB: numberVal(metadata.size),
		};
	}
}
