import * as env from 'dotenv';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as render from 'koa-ejs';
import * as path from 'path';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import apiRouter from './router/api';
import webRouter from './router/web';

env.config();

(async () => {
  await createConnection();
  const app = new Koa();
  app.use(bodyParser());

  render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
  });

  app.use(webRouter.routes())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods());

  app.listen(3000, () => console.log('Server has started!'));
})();
