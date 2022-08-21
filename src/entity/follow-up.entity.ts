import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FollowUp {
    @PrimaryColumn()
    id!: number;

    @Column()
    reviwer!: number;
    
    @Column({ name: "recommended_actions" })
    recommendedActions!: string;
    
    @Column()
    rapporter!: string;
    
    @Column({ name: "carred_out" })
    carredOut!: string;    
}
