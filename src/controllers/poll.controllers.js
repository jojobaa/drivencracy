import db from "../database/db.js";
import dayjs from "dayjs";

async function pollController (req, res) {
    const { title, expireAt } = req.body;
    const poll = { title, expireAt };

    if (!expireAt || dayjs(expireAt).isBefore(dayjs()) || expireAt === "") {
        poll.expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
    }

    try{
        await db.collection("polls").insertOne(poll);
        res.status(201).send([poll]);
        return;
    }catch(err){
        res.status(500).send(err);
        return;
    }
}

async function getPollController (req, res) {
    const polls = await db.collection("polls").find({}).toArray();
    res.send(polls);
    try{
        const polls = await db.collection("polls").find({}).toArray();
        res.send(polls.reverse());
        return;
    }
    catch(err){
        res.status(500).send(err);
        return;
    }
}

export { pollController, getPollController };