import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Gratuation } from "./gratuation-object-type";
import { UpdateGratuationInput } from "./gratuation.input";
import { GratuationService } from "./gratuation.service";

@Resolver(() => Gratuation)
export class GratuationResolver {
	constructor(private readonly gratuationService: GratuationService) {}

	@Mutation(() => Gratuation)
	updateGratuation(
		@Args('profilId')
		profilId: string,

		@Args('values')
		values: UpdateGratuationInput,
	) {
		return this.gratuationService.update(profilId, values);
	}
}
