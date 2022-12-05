import {Router} from 'express';
import {GetChoicesController, PostChoiceController} from '../controllers/choice.controller.js';
import {ChoiceMiddleware} from '../middlewares/choice.middleware.js';

export const ChoiceRouter = Router();

ChoiceRouter.get('/choice/', GetChoicesController);
ChoiceRouter.post('/choice', ChoiceMiddleware, PostChoiceController);