import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Information {
    @PrimaryColumn()
    id!: number;

    @Column({ name: "date_of_notification" })
    dateOfNotification!: Date;

    @Column()
    tier!: number;

    @Column({ name: "date_of_detection" })
    dateOfDetection!: Date;

    @Column({ name: "type_of_software" })
    typeOfSoftware!: string;
}
