import { Column, Entity } from "typeorm";
import { Incident } from "./Incident";

@Entity()
export class FollowUp extends Incident{
    @Column()
    reviwer :Number ;
    @Column()
    recommendedActions : String ;
    @Column()
    rapporter : string ;
    @Column()
    carredOut :string ;
    
}