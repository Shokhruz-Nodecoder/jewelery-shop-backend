const Joi = require("joi");

const AdminValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(data);
  return error ? error.message : false;
};

module.exports = { AdminValidation };
        