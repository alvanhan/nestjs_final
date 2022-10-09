import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Profile } from "./profile.entity";
import { Role } from "src/auth/model/role.enum";

@Entity({name: 'users'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    roles: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    // roles: Role.User;
    // relasi ke role
    // @OneToOne(() => Role)
    // @JoinColumn()
    // public role: Role;
 
    @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
    public profile: Profile

    //sebelum masuk db hasing password  nya
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
    
    //untuk validasi chek pssword nya di sini
    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
    

}