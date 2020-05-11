import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/UserRepository';

export default class AuthController {

  public static async login(ctx: Context): Promise<void> {
    try {
      const user = await getCustomRepository(UserRepository).auth(ctx.request.body.email, ctx.request.body.password);
      ctx.status = 200;
      ctx.body = {
        token: jwt.sign(Object.assign({}, user), 'secret', { expiresIn: parseInt(process.env.TOKEN_TTL) }),
        user
      };
    } catch (error) {
      ctx.throw(401, error);
    }
  }

  public static user(ctx: Context): void {
    ctx.body = ctx.state.user;
  }

}
