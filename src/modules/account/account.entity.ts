import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profil } from "../profil/profil-object-type";
import { ProfilEntity } from "../profil/profil.entity";

@Entity('Account')
export class AccountEntity {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column({ unique: true })
	email!: string;

	@Column({ nullable: true })
	passwordHash?: string;

	@OneToOne(()=>ProfilEntity, (profil)=>profil.account,{eager: true})
	profil!: ProfilEntity;
}

@ObjectType()
export class Account {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	email!: string;

	@Field(()=>Profil,{nullable: true})
	profil?: Profil;
}
