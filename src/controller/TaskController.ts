import { Context } from 'koa';
import { getConnection } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Task } from './../entity/Task';
import { UserRepository } from '../repository/UserRepository';

export default class TaskController {

  public static async list(ctx: Context): Promise<void> {
    const connection = await getConnection();
    const tasks = await connection.getRepository(Task).find({ where: { userId: ctx.state.user.id }});
    ctx.body = tasks;
  }

  public static async show(ctx: Context): Promise<void> {
    try {
      const connection = await getConnection();
      const task = await connection.getRepository(Task).findOneOrFail(ctx.params.id);
      ctx.body = task;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        ctx.throw(404, error);
      } else {
        throw error;
      }
    }
  }

  public static async create(ctx: Context): Promise<void> {
    const connection = await getConnection();
    const task = new Task();
    task.user = await connection.getCustomRepository(UserRepository).getUserFromContext(ctx);
    task.name = ctx.request.body.name;
    task.color = ctx.request.body.color;
    task.position = ctx.request.body.position;
    task.isDone = ctx.request.body.isDone;
    ctx.body = await connection.getRepository(Task).save(task);
  }

  public static async update(ctx: Context): Promise<void> {
    try {
      const connection = await getConnection();
      const task = await connection.getRepository(Task).findOneOrFail(ctx.params.id);
      task.name = ctx.request.body.name;
      task.color = ctx.request.body.color;
      task.position = ctx.request.body.position;
      task.isDone = ctx.request.body.isDone;
      ctx.body = await connection.getRepository(Task).save(task);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        ctx.throw(404, error);
      } else {
        throw error;
      }
    }
  }

  public static async delete(ctx: Context): Promise<void> {
    const connection = await getConnection();
    ctx.body = await connection.getRepository(Task).delete(ctx.params.id);
  }
}
