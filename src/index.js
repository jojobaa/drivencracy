import express from 'express'
import cors from 'cors';
import dotenv from "dotenv";
import { router } from './routes/poll.routes.js';
import { ChoiceRouter } from './routes/choice.router.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);
server.use(ChoiceRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("Server in port 5000"));