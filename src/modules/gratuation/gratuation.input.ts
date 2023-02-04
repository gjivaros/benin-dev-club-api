import { Field, InputType, Int } from "@nestjs/graphql";
import { GratuationStatue } from "./gratuation.entity";

@InputType()
export class UpdateGratuationInput {
	@Field(() => String)
	status!: GratuationStatue;

	@Field(()=>Int)
	gratuationYear!: number;
}
