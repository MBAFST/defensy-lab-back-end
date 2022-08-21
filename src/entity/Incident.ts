import { Client } from './Client';

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Incident {
    @PrimaryGeneratedColumn({name : "incident_id"})
    incidentId : Number ;

    @ManyToOne(()=>Client , (Client) => Client.incidents)
    client : Client ;
}