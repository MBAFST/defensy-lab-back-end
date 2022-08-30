import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Incident {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "user_id" })
    userId!: number;
}
