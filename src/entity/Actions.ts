import { Column, Entity } from "typeorm";
import { Incident } from "./Incident";

@Entity()
export class Actions extends Incident{
    @Column()
    identificationMeasures : String ;
    @Column()
    restrainMeasures : String ;
    @Column()
    evidenceCollected : String ;
    @Column()
    eradicationMeasures :string ;
    @Column()
    recoveryMeasures : string ;
    @Column()
    otherMitigationMeasures : string ;
}
