import { createConnection } from 'typeorm';
import userSeeder from './userSeeder';
import taskSeeder from './taskSeeder';

(async () => {
  console.log('Seeding database...');
  await createConnection();
  await userSeeder();
  await taskSeeder();
  console.log('Done.');
})();
