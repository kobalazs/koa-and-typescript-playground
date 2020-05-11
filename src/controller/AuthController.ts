import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/UserRepository';

export default class AuthController {

  public static async login(ctx: Context): Promise<void> {
    try {
      const user = await getCustomRepository(UserRepository).auth(ctx.request.body.email, ctx.request.body.password);
      const userData = { id: user.id, name: user.name, email: user.email };
      ctx.status = 200;
      ctx.body = {
        token: jwt.sign(userData, 'secret', { expiresIn: 60*5 }),
        message: 'Succesful login',
        user: userData
      };
    } catch (error) {
      console.error(error);
      ctx.throw(401, 'Login failed');
    }
  }

  public static user(ctx: Context): void {
    ctx.body = ctx.state.user;
  }

}
