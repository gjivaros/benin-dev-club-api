import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/context";
import { AccountModule } from "../account/account.module";
import { AuthResolver } from "./auth.resolver";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
