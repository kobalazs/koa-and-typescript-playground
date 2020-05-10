import * as KoaRouter from 'koa-router';

const router = new KoaRouter({
  prefix: '/api'
});

router.get('/', async ctx => ctx.body = { hello: 'api' });
router.get('/test', async ctx => ctx.body = { hello: 'api test' });

export default router;
