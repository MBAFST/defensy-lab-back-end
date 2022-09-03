import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Resume {
    @PrimaryColumn()
    id!: number;

    @Column({ name: "detection_type" })
    detectionType!: number;

    @Column()
    description!: string;
    
    @Column()
    members!: string;
}
