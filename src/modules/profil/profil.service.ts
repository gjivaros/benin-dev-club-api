import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { avatarUrl } from "src/helpers/utils-helpers";
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

	async findOne(accountId: string) {
		const profile = await this.profileRepository.findOneOrFail({ where: { accountId } });
		profile.skills = JSON.parse(profile.skills as string);
		profile.links = JSON.parse(profile.links as string);
		return profile;
	}

	async avatar(accountId: string) {
		const { photo } = await this.profileRepository.findOneOrFail({
			where: { accountId },
			relations: ["photo"],
		});

		if (!photo) return undefined;
		const [, extension] = photo.mediaType.split("/");
		return avatarUrl({ uid: photo.uid, extension });
	}
}
