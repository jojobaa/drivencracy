import { Router } from 'express';
import { getPollController, pollController } from '../controllers/poll.controllers.js';
import { pollMiddlewares } from '../middlewares/poll.middleware.js';

export const Pollrouter = Router();

Pollrouter.get('/poll', getPollController);
Pollrouter.post('/poll', pollMiddlewares, pollController);
