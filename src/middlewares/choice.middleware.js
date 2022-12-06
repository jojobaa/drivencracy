import joi from 'joi';

export function choiceMiddlewares(req, res, next) {
    const { title, pollId } = req.body;

    const choiceSchema = joi.object({ title: joi.string().min(1).required(), pollId: joi.required() });
    const { error } = choiceSchema.validate(req.body);

    if (error) {
        return res.status(422).json({ message: error.message });
       
    }
    next();
}