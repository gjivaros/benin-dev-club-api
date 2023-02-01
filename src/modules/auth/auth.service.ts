import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { appLog } from "src/context";
import { comparePassword } from "src/helpers/passwordEncrypt-helper";
import { AccountService } from "../account/account.service";

@Injectable()
export class AuthService {
	constructor(private accountService: AccountService, private jwtService: JwtService) {}

	async validateUser({ email, password }: LoginInput) {
		try {
			const user = await this.accountService.findByEmail(email);
			let samePassword = false;
			if (user.passwordHash) {
				samePassword = await comparePassword(password, user.passwordHash);
			}
			const canPass = user?.passwordHash && samePassword;
			if (canPass) {
				return user;
			}
		} catch (error) {
			appLog.error(error);
		}
	}

	async register(payload: LoginInput) {
		const { passwordHash, ...account } = await this.accountService.create(payload);
		return account;
	}

	async login(user: LoginInput): Promise<LoginSuccess | LoginFaild> {
		const payload = await this.validateUser(user);
		if (payload) {
			if (!payload.profil) {
				await this.accountService.createProfil(payload.id);
			}
			return {
				id: payload.id,
				email: payload.email,
				token: this.jwtService.sign({
					email: payload.email,
					id: payload.id,
				}),
			};
		}
		return {
			message: "Unauthorized",
			statusCode: 401,
		};
	}

	verifyToken(token: string) {
		try {
			this.jwtService.verify(token);
			return true;
		} catch (error) {
			appLog.error(error);
			return false;
		}
	}
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface LoginSuccess {
	id: string;
	email: string;
	token: string;
}

export interface LoginFaild {
	statusCode: 401;
	message: "Unauthorized";
}
