import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.tasks)
  user: User;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  position: number;

  @Column()
  isDone: boolean = false;
}
