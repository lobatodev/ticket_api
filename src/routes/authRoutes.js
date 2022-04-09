import { Router } from 'express';
import isAuthenticated from '../app/middlewares/isAuthenticated';
import UserController from '../app/controllers/UserController';
import TicketController from '../app/controllers/TicketController';

const routes = new Router();

routes.use(isAuthenticated);

routes.get('/users', UserController.getList);
routes.post('/users', UserController.insert);

routes.get('/tickets', TicketController.getList);
routes.get('/tickets/:id', TicketController.getOne);
routes.post('/tickets', TicketController.insert);
routes.post('/tickets/message/:id', TicketController.insertMessage);

export default routes;
