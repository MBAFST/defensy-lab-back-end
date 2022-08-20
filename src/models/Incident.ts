import { FollowUp } from './FollowUp';
import { Information } from './Information';
import { Attachement } from './Attachement';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Resume } from './Resume';
import { Actions } from './Actions';
import { Evaluation } from './Evaluation';

@Entity()
export class Incident {
    @PrimaryGeneratedColumn({name : "client_id"})
    ClientId :Number ;

    @Column({name : "incident_id"})
    incidentId : Number ;

    @Column()
    @ManyToMany(() => Incident)
    @JoinColumn({name : "client_id" })
    client : Client ;

    @Column()
    attachement : Attachement ;

    @Column()
    infromation : Information ;

    @Column()
    resume : Resume ;

    @Column()
    notification : Notification ;

    @Column()
    actions : Actions ;
    
    @Column()
    evaluation : Evaluation ;

    @Column()
    followUp : FollowUp ;

    

}