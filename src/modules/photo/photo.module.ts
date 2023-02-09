import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoController } from "./photo.contoller";
import { PhotoEntity } from "./photo.entity";
import { PhotoService } from "./photo.service";

@Module({
  providers: [ PhotoService],
  controllers:[PhotoController],
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
})
export class PhotoModule {}
