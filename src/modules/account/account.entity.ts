import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Account')
export class AccountEntity {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column({ unique: true })
	email!: string;

	@Column({ nullable: true })
	passwordHash?: string;
}

@ObjectType()
export class Account {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	email!: string;
}
