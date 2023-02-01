import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import { AccountEntity } from "../account/account.entity";
import { Links, Skills } from "./profil-object-type";

@Entity("Profil")
export class ProfilEntity {
	@PrimaryColumn()
	accountId!: string;

	@Column({nullable: true})
	pseudo?: string;

	@Column({nullable: true})
	firstName?: string;

	@Column({nullable: true})
	lastName?: string;

	@Column({ nullable: true, type: "text"})
	skills?: Skills;

	@Column({nullable: true})
	localisation?: string;

	@Column({nullable: true})
	description?: string;

	@Column({nullable: true, type: 'text'})
	links?: Links;

	@CreateDateColumn({default: new Date().toUTCString()})
	createAt!: string;

	@UpdateDateColumn({default: new Date().toUTCString()})
	updateAt!: string;

	@OneToOne(()=>AccountEntity, (account)=>account.profil)
	@JoinColumn({name: "accountId"})
	account!: AccountEntity;
}
