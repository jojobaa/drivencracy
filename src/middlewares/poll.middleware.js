import joi from 'joi';

function pollMiddlewares(req, res, next) {
  const pollSchema = joi.object().keys({
    title: joi.string().min(1).required(),
    expireAt: joi.required(),
  });

  const { title, expireAt } = req.body;
  const poll = { title, expireAt };
  const validatepoll = pollSchema.validate(poll);

  if (validatepoll.error) {
    res.status(422).send(validatepoll.error.details[0].message);
    return;
  } next();
}

export { pollMiddlewares };