const Joi = require('joi');

export const adminSchema = Joi.object({
    id: Joi.string(),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .required()

});
