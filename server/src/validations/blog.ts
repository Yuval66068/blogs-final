import Joi from "joi";

export const blogValidationSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(), 
  subtitle: Joi.string().min(2).max(200).optional(),
  body: Joi.string().min(10).required(), 
  image: Joi.object({
    alt: Joi.string().min(2).required(), 
    url: Joi.string().uri().required(), 
  }).required(), 
  userId: Joi.string().required(),
});