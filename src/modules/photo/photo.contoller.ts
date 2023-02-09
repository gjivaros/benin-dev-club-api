import {
	BadGatewayException,
	BadRequestException,
	Body,
	Controller,
	Get,
	Param,
	Post,
	Res,
	StreamableFile,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { PhotoService, UploadImageDto } from "./photo.service";

@Controller("")
export class PhotoController {
	constructor(private readonly photoService: PhotoService) {}

	@Post('api/upload')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: UploadImageDto) {
		if (!file) throw new BadRequestException("Missing file");
		const isImageFile = file.mimetype.startsWith("image/");
		if (!isImageFile) throw new BadRequestException("Invalid file: missing image file");

		return this.photoService.create({
			binaryFile: file.buffer,
			mediaType: file.mimetype,
			originalName: file.originalname,
			profilId: body.profilId,
		});
	}

	@Get('/:uid.:extension')
	async avatarUrl(
		@Param('uid')
		uid: string,

		@Param('extension')
		extension: string,

		@Res({ passthrough: true })
		res: Response,
	) {
		if (!(uid && extension)) throw new BadGatewayException("missing image uid and extension");
		const photo = await this.photoService.findOne({ uid, extension });

		res.set({
			"Content-Type": photo.mediaType,
			"Content-Disposition": `filename=${photo.originalName}.${extension}`,
		});

		return new StreamableFile(photo.binaryFile);
	}
}
