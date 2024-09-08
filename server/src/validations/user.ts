import Joi from "joi";

const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const userValidationSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).required(),
    last: Joi.string().min(2).required(),
  }),
  image: Joi.object({
    url: Joi.string().required(),
    alt: Joi.string().required(),
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(passwordPattern),
});
