import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService, LoginInput } from "../auth/auth.service";

@Controller('api')
export class LoginController {
	constructor(private readonly authservice: AuthService) {}

	async register(@Body() payload: LoginInput) {}

	@Post('login')
  @HttpCode(200)
	async login(@Body() loginInput: LoginInput) {
		return await this.authservice.login(loginInput);
	}
}
