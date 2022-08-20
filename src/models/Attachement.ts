import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./Incident";

@Entity()
export class Attachement{
    @PrimaryGeneratedColumn({name : "incident_id"})
    id : Number;

    @Column()
    image1 : Number[] ;

    @Column()
    image2 :Number[] ;

    @Column()
    image3 :Number[] ;

    @Column()
    image4 :Number[] ;

    @Column()
    image5 :Number[] ;

    @Column()
    @OneToOne(() => Incident)
    @JoinColumn({name : "incident_id"})
    incident : Incident ;
}