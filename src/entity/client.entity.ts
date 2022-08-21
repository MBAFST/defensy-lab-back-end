import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	contact!: string;

	@Column()
	place!: string;

	@Column("blob",{ nullable:true, name:"profil_photo" })
	profilPhoto?: Buffer;
}
