import { Column, Entity } from "typeorm";
import { Incident } from "./Incident";

@Entity()
export class Resume extends Incident {
    @Column()
    detectionType: string ;
    @Column()
    description : string ;
    @Column()
    members : string ;
    
}