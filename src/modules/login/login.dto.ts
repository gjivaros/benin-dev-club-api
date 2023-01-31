import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthUser {
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	password!: string;
}
