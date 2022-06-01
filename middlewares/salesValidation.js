const Joi = require('joi');

const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validation = (req, res, next) => {
  req.body.forEach((obj) => {
    const { error } = schema.validate(obj);

    if (!error) return next();

    const messages = error.details.map((e) => e.message);

    if (messages[0].includes('require')) return res.status(400).json({ message: messages[0] });

    res.status(422).json({ message: messages[0] });
  });
};

module.exports = validation;