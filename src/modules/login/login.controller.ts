import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { AuthUser } from "./login.dto";

@Controller('api')
export class LoginController {
	constructor(private readonly authservice: AuthService) {}

	@Post('register')
	async register(@Body() payload: AuthUser) {
		return await this.authservice.register(payload);
	}

	@Post('login')
  @HttpCode(200)
	async login(@Body() loginInput: AuthUser) {
		return await this.authservice.login(loginInput);
	}
}
