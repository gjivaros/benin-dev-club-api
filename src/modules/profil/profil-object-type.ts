import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
@InputType("SkillsInput")
export class Skills {
	@Field(()=>[String],{nullable: true})
	backEnd?: string[];

	@Field(()=>[String],{nullable: true})
	frontEnd?: string[];

	@Field(()=>[String],{nullable: true})
	devOps?: string[];

	@Field(()=>[String],{nullable: true})
	other?: string[];
}

@ObjectType()
@InputType("LinksInput")
export class Links {
	@Field(()=>String,{nullable: true})
	github?: string;

	@Field(()=>String,{nullable: true})
	linkdin?: string;

	@Field(()=>String,{nullable: true})
	portFolio?: string;
}

@ObjectType()
export class Profil {
	@Field(()=>ID)
	accountId!: string;

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

	@Field(()=>Date)
	createAt!: string;

	@Field(()=>Date)
	updateAt!: string;
}
