import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async auth(email: string, password: string): Promise<User> {
      const user = await this.findOne({ email });
      return user.matchPassword(password);
    }

}
