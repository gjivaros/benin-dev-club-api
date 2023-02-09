import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Profil } from "./profil-object-type";
import { UpdateProfilInput } from "./profil.input";
import { ProfilService } from "./profil.service";

@Resolver(() => Profil)
export class ProfilResolver {
	constructor(private readonly profilService: ProfilService) {}

	@Query(()=>Profil)
	async profil(
		@Args('accountId', {type: ()=>ID})
		accountId: string,
	) {
		return await this.profilService.findOne(accountId);
	}

	@Mutation(() => Profil)
	updateProfil(
		@Args('values')
		values: UpdateProfilInput,

		@Args('accountId',{type: ()=>ID})
		accountId: string,
	) {
		return this.profilService.update(accountId, values);
	}

	@ResolveField(()=>String)
	async avatar(
		@Parent()
		{ accountId }: Profil,
	) {
		return await this.profilService.avatar(accountId);
	}
}
