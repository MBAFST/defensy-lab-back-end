import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./Incident";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number ;
    @Column()
    firstName : string ;
    @Column()
    lastName : string ;
    @Column()
    email : string ;
    @Column()
    username : string ;
    @Column()
    password : string ;
    @Column()
    contact : string ;
    @Column()
    place :string ;
    @Column()
    profilePhoto : Number[] ;

    @OneToMany(() => Incident , (Incident) => Incident.client)
    incidents : Incident[] ;
}