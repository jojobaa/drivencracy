import { Router } from 'express';
import { GetPollController, PostPollController} from '../controllers/poll.controllers.js';
import { PostPollMiddleware } from '../middlewares/poll.middleware.js';

export const router = Router();

router.get('/poll', GetPollController);
router.post('/poll', PostPollMiddleware, PostPollController);
