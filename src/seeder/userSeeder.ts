import { getConnection } from 'typeorm';
import { User } from '../entity/User';

export default async () => {
  const userRepository = await getConnection().getRepository(User);
  userRepository.insert({ name: 'Tobias Test', email: 'test@example.com', password: 'secret' });
};
