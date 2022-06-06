const Joi = require('joi');

const schema = Joi.array().items({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
}).required();

const validation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (!error) return next();

  const messages = error.details.map((e) => e.message);
  // console.log('console do array', messages);

  const messageReturned = messages[0].slice(0, 1).concat(messages[0].slice(5));
  // console.log('console da mensagem:', messageReturned);

  if (messages[0].includes('require')) return res.status(400).json({ message: messageReturned });

  res.status(422).json({ message: messageReturned });
};

module.exports = validation;