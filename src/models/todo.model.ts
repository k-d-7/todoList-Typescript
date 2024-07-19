import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "todos" })
export class ToDo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 80 })
    name!: string;

    @Column({ type: "date", nullable: true })
    startDate?: string;

    @Column({ type: "date", nullable: true })
    endDate?: string;
}
