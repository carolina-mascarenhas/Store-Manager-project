const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (!error) {
    return next();
  }

  const messages = error.details.map((e) => e.message);
  if (messages[0].includes('required')) return res.status(400).json({ message: messages[0] });

  return res.status(422).json({ message: messages[0] });
};

module.exports = validation;