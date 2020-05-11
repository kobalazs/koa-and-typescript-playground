import { getConnection } from 'typeorm';
import { User } from '../entity/User';

export default async () => {
  const user = new User();
  user.name = 'Tobias Test';
  user.email = 'test@example.com';
  user.password = 'secret';

  await getConnection().getRepository(User).insert(user);
};
