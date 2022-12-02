import express from 'express'
import cors from 'cors';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// const messageSchema = joi.object({
//   to: joi.string().required(),
//   text: joi.string().required(),
// });

const server = express();
server.use(cors());
server.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

await mongoClient.connect().then(() => {
  db = mongoClient.db("drivencracy");
});


server.listen(5000, () => console.log("Server in port 5000"));