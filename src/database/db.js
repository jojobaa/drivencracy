import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
    await mongoClient.connect();
    console.log("mongodb conectou!");
} catch (err) {
    console.log(err);
}
const db = mongoClient.db('drivencracy');
export default db;