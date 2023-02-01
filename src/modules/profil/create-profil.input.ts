import { Field, InputType } from "@nestjs/graphql";
import { Links, Skills } from "./profil-object-type";

@InputType()
export class UpdateProfilInput {
	@Field(()=>String)
	pseudo!: string;

	@Field(()=>String)
	firstName!: string;

	@Field(()=>String)
	lastName!: string;

	@Field(()=>Skills)
	skills!: Skills;

	@Field(()=>String)
	localisation!: string;

	@Field(()=>String)
	description!: string;

	@Field(()=>Links)
	links!: Links;

	@Field(()=>Date)
	createAt!: string;

	@Field(()=>Date)
	updateAt!: string;
}
