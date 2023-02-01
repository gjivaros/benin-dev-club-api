import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UpdateProfilInput } from "./create-profil.input";
import { Profil } from "./profil-object-type";
import { ProfilEntity } from "./profil.entity";
import { ProfilService } from "./profil.service";

@Resolver(() => ProfilEntity)
export class ProfilResolver {
	constructor(private readonly profilService: ProfilService) {}

	@Mutation(() => Profil)
	updateProfil(
		@Args('values')
		values: UpdateProfilInput,

		@Args('accountId')
		accountId: string,
	) {
		return this.profilService.update(accountId, values);
	}
}
