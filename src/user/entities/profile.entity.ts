import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({name: 'profiles'})
export class Profile extends  BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true})
    avatar: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => User)
    @JoinColumn()
    public user!: User;

}

