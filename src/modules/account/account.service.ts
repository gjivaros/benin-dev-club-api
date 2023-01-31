import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from "src/helpers/passwordEncrypt-helper";
import { Repository } from "typeorm";
import { LoginInput } from "../auth/auth.service";
import { AccountEntity } from "./account.entity";

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
	) {}

	async create({ password, email }: LoginInput) {
		const passwordHash = await hashPassword(password);
		return await this.accountRepository.save({ email, passwordHash });
	}

	async findByEmail(email: string) {
		const user = await this.accountRepository.findOne({
			where: { email },
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}

	async account(id: string): Promise<AccountEntity> {
		const user = await this.accountRepository.findOne({
			where: {
				id,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return {
			...user,
			passwordHash: undefined,
		};
	}
}
