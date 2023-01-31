import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LoginController } from "./login.controller";

@Module({
  controllers: [LoginController],
  imports: [AuthModule],
})
export class LoginModule {}
