import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

async function choiceController(req, res) {
    const { title, pollId } = req.body;
    const choice = { title, pollId };

    try {
        const existingPoll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) });
        const choiceId = await db.collection("choices").findOne({ title: title, pollId: pollId });
        if (!existingPoll) {
            return res.status(404).json();
            
        }
        const expired = existingPoll.expireAt;
        console.log(expired)
        if (dayjs(expired).isBefore(dayjs())) {
            return res.status(403).json();
            
        }
        if (choiceId) {
            return res.status(409).json();
            
        }
        await db.collection("choices").insertOne(choice);
        return res.status(201).json();
        
    }
    catch (err) {
        return res.status(500).json();
        
    }
}

async function getChoiceController(req, res) {

    const id = req.params.id;
    try {
        const choices = await db.collection("choices").find({ pollId: id }).toArray();
        if (!choices) {
            return res.status(404).json();

        }
        return res.status(200).json(choices);

    }
    catch (err) {
        return res.status(500).json();

    }
}

async function choiceVoteController(req, res) {
    const id = req.params.id;
    const vote = { createdAt: dayjs().format('YYYY-MM-DD HH:mm'), choiceId: id };
    try {
        const choiceId = await db.collection("choices").findOne({ _id: new ObjectId(id) });
        if (!choiceId) {
            return res.status(404).json();

        }
        const pollId = await db.collection("polls").findOne({ _id: new ObjectId(choiceId.pollId) });
        const expired = pollId.expireAt;
        if (dayjs(expired).isBefore(dayjs())) {
            return res.status(403).json();

        }
        await db.collection("votes").insertOne(vote);
        return res.status(201).json();
    } catch (err) {
        return res.status(500).json();
    }
}

export { choiceController, getChoiceController, choiceVoteController };
