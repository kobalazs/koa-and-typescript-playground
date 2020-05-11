import { EntityRepository, Repository } from 'typeorm';
import { Context } from 'koa';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async auth(email: string, password: string): Promise<User> {
    const user = await this.findOne({ where: { email }, select: ['id', 'name', 'email', 'hash'] });
    if (await user.hasMatchingPassword(password)) {
      delete user.hash;
      return user;
    } else {
      throw new Error('Email or password mismatch');
    }
  }

  public async getUserFromContext(ctx: Context): Promise<User> {
    if (!ctx.state.user) {
      throw new Error('Cannot create user from context');
    }
    return this.findOne(ctx.state.user.id);
  }

}
