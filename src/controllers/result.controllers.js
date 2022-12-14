import db from "../database/db.js";
import { ObjectId } from "mongodb";

async function resultController(req, res) {
    const id = req.params.id;

    try {
        let arrayVote = [];
        let index = 0;
        const choices = await db.collection('choices').find({ pollId: id }).toArray();
        const vote = await db.collection('votes').find({}).toArray();
        const poll = await db.collection('polls').findOne({ _id: ObjectId(id) });

        if (!poll) {
            res.status(404).send({ message: "Poll not found" });
            return;
        }

        for (let i = 0; i < choices.length; i++) {
            choices[i].vote = 0;
            for (let j = 0; j < vote.length; j++) {
                if (choices[i]._id.toString() === vote[j].choicesId) {
                    choices[i].vote++;
                }
            }
            arrayVote.push(choices[i].vote);
            if (choices[i].vote > arrayVote[index]) {
                index = i;
            }
        }
        // const poll = await db.collection('polls').findOne({ _id: ObjectId(id) });
        return res.status(200).send({ ...poll, result: { title: choices[index].title, vote: choices[index].vote } });
       
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

export { resultController }
