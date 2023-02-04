import { Field, InputType } from "@nestjs/graphql";
import { Links, Skills } from "./profil-object-type";

@InputType()
export class UpdateProfilInput {
	@Field(()=>String,{nullable: true})
	pseudo?: string;

	@Field(()=>String,{nullable: true})
	firstName?: string;

	@Field(()=>String,{nullable: true})
	lastName?: string;

	@Field(()=>Skills,{nullable: true})
	skills?: Skills;

	@Field(()=>String,{nullable: true})
	localisation?: string;

	@Field(()=>String,{nullable: true})
	description?: string;

	@Field(()=>Links,{nullable: true})
	links?: Links;
}
