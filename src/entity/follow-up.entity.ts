import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FollowUp {
    @PrimaryColumn()
    id!: number;

    @Column()
    reviewer!: number;
    
    @Column({ name: "recommanded_actions" })
    recommandedActions!: string;
    
    @Column()
    rapporter!: string;
    
    @Column({ name: "carred_out" })
    carredOut!: string;    
}
