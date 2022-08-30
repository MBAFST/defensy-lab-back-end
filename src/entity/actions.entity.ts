import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Actions {
    @PrimaryColumn()
    id!: number;

    @Column({ name: "identification_measures" })
    identificationMeasures!: string;

    @Column({ name: "restraint_measures" })
    restraintMeasures!: string ;
    
    @Column({ name: "evidence_collected" })
    evidenceCollected!: string;
    
    @Column({ name: "eradication_measures" })
    eradicationMeasures!: string;
    
    @Column({ name: "recovery_measure" })
    recoveryMeasure!: string;
    
    @Column({ name: "other_mitigation_measures" })
    otherMitigationMeasures!: string;
}
