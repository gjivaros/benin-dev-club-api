import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { ProfilEntity } from "../profil/profil.entity";

@Entity("Gratuation")
export class GratuationEntity {
	@PrimaryColumn()
	profilId!: string;

	@Column({nullable: true})
	status?: GratuationStatue;

	@Column({nullable: true, type: "integer"})
	gratuationYear?: number;

	@OneToOne(()=>ProfilEntity, (profil)=>profil.gratuation)
  @JoinColumn({name: 'profilId'})
	profil!: ProfilEntity;
}

export type GratuationStatue = "student" | "graduate" | "observer";
