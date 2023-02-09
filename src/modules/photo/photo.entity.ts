import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { ProfilEntity } from "../profil/profil.entity";

@Entity('Photo')
export class PhotoEntity {
	@PrimaryColumn({type: "varchar"})
	uid!: string;

	@Column({type: "varchar"})
	originalName!: string;

	@Column({type: 'integer'})
	height!: number;

	@Column({type: 'integer'})
	width!: number;

	@Column({type: 'integer'})
	weightB!: number;

	@Column({type: 'blob'})
	binaryFile!: Buffer;

	@Column({type: 'varchar'})
	mediaType!: string;

	@Column({type: "varchar"})
	profilId!: string;

	@OneToOne(()=>ProfilEntity, (profil)=>profil.photo)
  @JoinColumn({name: 'profilId'})
	profil!: ProfilEntity;
}
