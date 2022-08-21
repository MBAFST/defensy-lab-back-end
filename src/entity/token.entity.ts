import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "user_id" })
    userId!: number;

    @Column()
    token!: string;

    @CreateDateColumn({ name: "issued_at" })
    issuedAt!: Date;

    @Column({ name: "expired_at" })
    expiredAt!: Date;
}
