const Joi = require('joi');

export const groupSchema = Joi.object({
    id: Joi.string(),

    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'SHARE', 'UPLOAD_FILES', 'DELETE')) 
});
