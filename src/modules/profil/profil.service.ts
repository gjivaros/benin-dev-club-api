import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateProfilInput } from "./create-profil.input";
import { ProfilEntity } from "./profil.entity";

@Injectable()
export class ProfilService {
	constructor(
		@InjectRepository(ProfilEntity)
		private readonly profileRepository: Repository<ProfilEntity>,
	) {}

	async update(accountId: string, values: UpdateProfilInput) {
		await this.profileRepository.update({ accountId }, values);
		return await this.profileRepository.findOneOrFail({ where: { accountId } });
	}
}
