import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryColumn()
    id!: number;

    @Column()
    notifier!: number;
}
