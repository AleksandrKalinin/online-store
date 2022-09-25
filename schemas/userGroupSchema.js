const Joi = require('joi');

export const userGroupSchema = Joi.object({
    id: Joi.string(),

    userId: Joi.number(),

    groupId: Joi.number()
});
