import joi from 'joi';

function PostPollMiddleware(req, res, next) {
  const pollSchema = joi.object().keys({
    title: joi.string().min(1).required(),
    expireAt: joi.required(),
});

const { title, expireAt } = req.body;
const poll = { title, expireAt };
const validationpoll = pollSchema.validate(poll);

    if (validationpoll.error) {
      res.status(422).send(validationpoll.error.details[0].message);
      return;

    } next();
  }

export { PostPollMiddleware };