import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Client {
	@PrimaryColumn()
	id!: number;

	@Column()
	contact!: string;

	@Column()
	place!: string;

	@Column("blob",{ nullable:true, name:"profil_photo" })
	profilPhoto?: Buffer;
}
