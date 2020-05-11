import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => User, user => user.tasks)
  public user: User;

  @Column()
  public name: string;

  @Column()
  public color: string;

  @Column()
  public position: number;

  @Column()
  public isDone: boolean = false;
}
