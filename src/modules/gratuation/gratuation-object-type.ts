import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { GratuationStatue } from "./gratuation.entity";

@ObjectType()
export class Gratuation {
	@Field(()=>ID)
	profilId!: string;

	@Field(()=>String)
	status!: GratuationStatue;

	@Field(()=>Int)
	gratuationYear!: number;
}
