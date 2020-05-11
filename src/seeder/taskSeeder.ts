import { getConnection } from 'typeorm';
import { User } from './../entity/User';
import { Task } from '../entity/Task';

export default async () => {
  const connection = await getConnection();
  const user = await connection.getRepository(User).findOne();

  const task = new Task();
  task.user = user;
  task.name = 'Test task';
  await connection.getRepository(Task).insert(task);
};
