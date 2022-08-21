import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Incident {
    @PrimaryGeneratedColumn({name : "incident_id"})
    id!: number;

    @Column({ name: "user_id" })
    userId!: number;
}
