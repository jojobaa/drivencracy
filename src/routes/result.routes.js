import { Router } from 'express';
import { resultController } from '../controllers/result.controllers.js';

export const resultRouter = Router();

resultRouter.get('/poll/:id/result', resultController);