import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilEntity } from "./profil.entity";
import { ProfilResolver } from "./profil.resolver";
import { ProfilService } from "./profil.service";

@Module({
  providers: [ProfilResolver, ProfilService],
  imports:[TypeOrmModule.forFeature([ProfilEntity])]
})
export class ProfilModule {}
