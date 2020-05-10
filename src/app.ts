import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as render from 'koa-ejs';
import * as path from 'path';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import apiRoutes from './api/routes';

(async () => {
  await createConnection();
  const app = new Koa();
  const router = new KoaRouter();

  render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
  });

  router.get('/', async ctx => {
    const welcomes = ['Welcome', 'Wilcommen', 'Üdvözöllek', 'Bienvenidos'];
    await ctx.render('index', { title: 'Welcomes', welcomes });
  });
  router.get('/hello', async ctx => ctx.body = { hello: 'world' });

  app.use(router.routes())
    .use(router.allowedMethods())
    .use(apiRoutes.routes());

  app.listen(3000, () => console.log('Server has started!'));
})();
