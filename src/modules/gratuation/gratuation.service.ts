import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GratuationEntity } from "./gratuation.entity";
import { UpdateGratuationInput } from "./gratuation.input";

@Injectable()
export class GratuationService {
	constructor(
		@InjectRepository(GratuationEntity)
		private readonly gratuationrepository: Repository<GratuationEntity>,
	) {}

	async findOne(profilId: string) {
		return await this.gratuationrepository.findOneOrFail({ where: { profilId } });
	}
	async update(profilId: string, values: UpdateGratuationInput) {
		await this.gratuationrepository.update({ profilId }, values);
		return this.gratuationrepository.findOneOrFail({ where: { profilId } });
	}
}
