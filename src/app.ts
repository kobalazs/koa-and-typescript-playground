import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as render from 'koa-ejs';
import * as path from 'path';

const app = new Koa();
const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

router.get('/', async ctx => {
  await ctx.render('index');
});
router.get('/hello', async ctx => ctx.body = { hello: 'world' });

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Server has started!'));
