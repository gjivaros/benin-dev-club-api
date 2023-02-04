import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfilEntity } from "./profil.entity";
import { UpdateProfilInput } from "./profil.input";

@Injectable()
export class ProfilService {
	constructor(
		@InjectRepository(ProfilEntity)
		private readonly profileRepository: Repository<ProfilEntity>,
	) {}

	async update(accountId: string, values: UpdateProfilInput) {
		await this.profileRepository.update(
			{ accountId },
			{ ...values, skills: JSON.stringify(values.skills), links: JSON.stringify(values.links) },
		);
		const profile = await this.profileRepository.findOneOrFail({ where: { accountId } });
		profile.skills = JSON.parse(profile.skills as string);
		profile.links = JSON.parse(profile.links as string);
		return profile;
	}
}
