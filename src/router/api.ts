import * as KoaRouter from 'koa-router';
import * as KoaJwt from 'koa-jwt';
import AuthController from '../controller/AuthController';
import TaskController from '../controller/TaskController';

const router = new KoaRouter({
  prefix: '/api'
});

router.get('/', async ctx => ctx.body = { hello: 'api' });
router.post('/auth', AuthController.login);

router.use(KoaJwt({ secret: 'secret' }));
router.get('/user', AuthController.user);

router.get('/task', TaskController.list);
router.get('/task/:id', TaskController.show);
router.post('/task', TaskController.create);
router.put('/task/:id', TaskController.update);
router.del('/task/:id', TaskController.delete);

export default router;
