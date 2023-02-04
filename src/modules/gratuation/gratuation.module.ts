import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GratuationEntity } from "./gratuation.entity";
import { GratuationExtendsResolver } from "./gratuation.extends.resolver";
import { GratuationResolver } from "./gratuation.resolver";
import { GratuationService } from "./gratuation.service";

@Module({
  providers: [GratuationResolver, GratuationService, GratuationExtendsResolver],
  imports: [TypeOrmModule.forFeature([GratuationEntity])]
})
export class GratuationModule {}
