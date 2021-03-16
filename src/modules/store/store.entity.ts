import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Store')
export class Store extends BaseEntity {
    @PrimaryColumn()
    id_store: string;

    @Column()
    name_store: string;

    @Column()
    address: string

    @Column()
    password: string;

    @Column()
    phone: string;
}