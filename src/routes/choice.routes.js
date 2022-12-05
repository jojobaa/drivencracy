import { Router } from 'express';
import { getChoiceController, choiceController, choiceVoteController } from '../controllers/choice.controllers.js';
import { choiceMiddlewares } from '../middlewares/choice.middleware.js';


export const ChoiceRouter = Router();

ChoiceRouter.get('/choice/:id', getChoiceController);
ChoiceRouter.post('/choice', choiceMiddlewares, choiceController);
ChoiceRouter.post('/choice/:id/vote', choiceVoteController);