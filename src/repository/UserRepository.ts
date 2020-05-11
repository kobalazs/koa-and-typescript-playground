import { EntityRepository, Repository } from 'typeorm';
import { Context } from 'koa';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async auth(email: string, password: string): Promise<User> {
    const user = await this.findOne({ email });
    return user.matchPassword(password);
  }

  public async getUserFromContext(ctx: Context): Promise<User> {
    if (!ctx.state.user) {
      throw new Error('Cannot create user from context');
    }
    return this.findOne(ctx.state.user.id);
  }

}
