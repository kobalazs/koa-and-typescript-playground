import { createConnection } from 'typeorm';
import userSeeder from './userSeeder';

(async () => {
  console.log('Seeding database...');
  await createConnection();
  await userSeeder();
  console.log('Done.');
})();
