import joi from 'joi';

export function ChoiceMiddleware(req, res, next){
    const {title, pollId} = req.body;

    const schemaChoice = joi.object({title: joi.string().min(1).required(), pollId: joi.required() });
    const {error} = schemaChoice.validate(req.body);

    if(error){
        res.status(422).json({message: error.message});
        return;
    }
    next();
}