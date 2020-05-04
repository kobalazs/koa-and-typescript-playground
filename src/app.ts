import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

const app = new Koa();
const router = new KoaRouter();

router.get('/', async ctx => ctx.body = { hello: 'world' });
router.get('/test', async ctx => ctx.body = { hello: 'test' });

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Server has started!'));
