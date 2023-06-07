const Joi = require("joi");

const createFB = (data) => {
  const schema = Joi.object({
   namee:Joi.string().required(),
   text: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  return error ? error.message : false;
};

module.exports = {createFB };
        