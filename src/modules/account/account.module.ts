import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "./account.entity";
import { AccountResolver } from "./account.resolver";
import { AccountService } from "./account.service";

@Module({
  providers: [AccountService, AccountResolver],
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  exports: [AccountService],
})
export class AccountModule {}
