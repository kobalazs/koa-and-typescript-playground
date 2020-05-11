import { Context } from 'koa';
import { getConnection } from 'typeorm';
import { Task } from './../entity/Task';

export default class TaskController {

  public static async list(ctx: Context): Promise<void> {
    const connection = await getConnection();
    const tasks = await connection.getRepository(Task).find({ where: { userId: ctx.state.user.id }});
    ctx.body = tasks;
  }

}
