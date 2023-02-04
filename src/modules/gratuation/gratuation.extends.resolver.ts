import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Profil } from "../profil/profil-object-type";
import { Gratuation } from "./gratuation-object-type";
import { GratuationService } from "./gratuation.service";

@Resolver(()=>Profil)
export class GratuationExtendsResolver {
	constructor(private readonly gratuationService: GratuationService) {}

	@ResolveField(()=>Gratuation)
	gratuation(
		@Parent()
		{ accountId }: Profil,
	) {
		return this.gratuationService.findOne(accountId);
	}
}
