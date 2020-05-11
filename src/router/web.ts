import * as KoaRouter from 'koa-router';

const router = new KoaRouter();
router.get('/', async ctx => {
  const welcomes = ['Welcome', 'Wilcommen', 'Üdvözöllek', 'Bienvenidos'];
  await ctx.render('index', { title: 'Welcomes', welcomes });
});
router.get('/hello', async ctx => ctx.body = { hello: 'world' });

export default router;
