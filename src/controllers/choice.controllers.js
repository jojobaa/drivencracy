import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

async function choiceController (req, res){
    const {title, pollId} = req.body;
    const choice = {title, pollId};

    try{
        const pollId = await db.collection("polls").findOne({_id: new ObjectId(pollId)});
        const choiceId = await db.collection("choices").findOne({title : title, pollId: pollId});
        if(!pollId){
            res.status(404).json();
            return;
        }
        const expired = pollId.expiredAt;
        if(dayjs(expired).isBefore(dayjs())){
            res.status(403).json();
            return;
        }
        if(choiceId){
            res.status(409).json();
            return;
        }
        await db.collection("choices").insertOne(choice);
        res.status(201).json();
        return;
    }
    catch(err){
        res.status(500).json();
        return;
    }
}

async function getChoiceController (req, res){

    const id = req.params.id;
    try{
        const choices = await db.collection("choices").find({pollId: id}).toArray();
        if (!choices){
            res.status(404).json();
            return;
        }
        res.status(200).json(choices);
        return;
    }
    catch(err){
        res.status(500).json();
        return;
    }
}

async function choiceVoteController (req, res){
    const id = req.params.id;
    const vote = {createdAt: dayjs().format('YYYY-MM-DD HH:mm'), choiceId: id};
    try{
        const choiceId = await db.collection("choices").findOne({_id: new ObjectId(id)});
        if(!choiceId){
            res.status(404).json();
            return;
        }
        const pollId = await db.collection("polls").findOne({_id: new ObjectId(choiceId.pollId)});
        const expired = pollId.expiredAt;
        if(dayjs(expired).isBefore(dayjs())){
            res.status(403).json();
            return;
        }
        await db.collection("votes").insertOne(vote);
        res.status(201).json();
        return;
    }catch(err){
        res.status(500).json();
        return;
    }
}

export {choiceController, getChoiceController, choiceVoteController};
