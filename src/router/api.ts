import * as KoaRouter from 'koa-router';
import * as KoaJwt from 'koa-jwt';
import AuthController from '../controller/AuthController';

const router = new KoaRouter({
  prefix: '/api'
});

router.get('/', async ctx => ctx.body = { hello: 'api' });
router.post('/auth', AuthController.login);

router.use(KoaJwt({ secret: 'secret' }));
router.get('/user', AuthController.user);

export default router;
