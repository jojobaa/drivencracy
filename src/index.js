import express from 'express'
import cors from 'cors';
import dotenv from "dotenv";
import { Pollrouter } from './routes/poll.routes.js';
import { ChoiceRouter } from './routes/choice.routes.js';
import { resultRouter } from './routes/result.routes.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(Pollrouter);
server.use(ChoiceRouter);
server.use(resultRouter);

// const port = process.env.PORT || 5000;
// server.listen(port, () => console.log("Server in port 5000"));

server.listen(5000, () => console.log("Server in port 5000"));
