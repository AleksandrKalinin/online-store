const Joi = require('joi');

export const userSchema = Joi.object({
    id: Joi.string(),

    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    age: Joi.number()
        .integer()
        .min(15)
        .max(100)
        .required(),

    isDeleted: Joi.boolean()    
});
