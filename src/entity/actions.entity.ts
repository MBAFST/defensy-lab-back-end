import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Actions {
    @PrimaryColumn()
    id!: number;

    @Column({ name: "identification_measures" })
    identificationMeasures!: string;

    @Column({ name: "restrain_measures" })
    restrainMeasures!: string ;
    
    @Column({ name: "evidence_collected" })
    evidenceCollected!: string;
    
    @Column({ name: "eradication_measures" })
    eradicationMeasures!: string;
    
    @Column({ name: "recovery_measures" })
    recoveryMeasures!: string;
    
    @Column({ name: "other_mitigation_measures" })
    otherMitigationMeasures!: string;
}
