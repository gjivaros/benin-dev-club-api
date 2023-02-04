import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { Profil } from "./profil-object-type";
import { ProfilEntity } from "./profil.entity";
import { UpdateProfilInput } from "./profil.input";
import { ProfilService } from "./profil.service";

@Resolver(() => ProfilEntity)
export class ProfilResolver {
	constructor(private readonly profilService: ProfilService) {}

	@Mutation(() => Profil)
	updateProfil(
		@Args('values')
		values: UpdateProfilInput,

		@Args('accountId',{type: ()=>ID})
		accountId: string,
	) {
		return this.profilService.update(accountId, values);
	}
}
