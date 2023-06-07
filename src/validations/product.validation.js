const Joi = require("joi");

const createPD = (data) => {
  const schema = Joi.object({
    sort: Joi.string().required(),
    cost: Joi.number().required(),
  });

  const { error } = schema.validate(data);
  return error ? error.message : false;
};

module.exports = { createPD };
