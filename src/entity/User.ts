import * as util from 'util';
import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Task } from './Task';

const hash = util.promisify(bcrypt.hash);
const compare = util.promisify(bcrypt.compare);

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ select: false })
  public hash: string;
  public password: string;

  @OneToMany(type => Task, task => task.user)
  public tasks: Task[];

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    if (this.password === undefined || this.password === null) {
      return;
    }
    this.hash = await hash(this.password, parseInt(process.env.HASH_ROUNDS));
  }

  public async hasMatchingPassword(password: string): Promise<boolean> {
    return compare(password, this.hash);
  }
}
