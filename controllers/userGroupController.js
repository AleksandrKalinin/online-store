const { v4: uuidv4 } = require('uuid');
const url = require('url');
const db = require('../db.js');

import { UserGroup } from '../models/UserGroup.js';
//import { userSchema } from '../schemas/groupSchema.js';
import { userGroupSchema } from '../schemas/userGroupSchema.js';


import { addUserToGroupService } from '../services/userGroupServices.js';

class UserGroupController {

    async addUserGroup(req, res) {
        const newUserGroup = new UserGroup(uuidv4(), 3, 7);
        const value = userGroupSchema.validate(newUserGroup);
        if (!value.error) {
            const serviceResult = await addUserToGroupService(newUserGroup);
            res.send(serviceResult);
        } else {
            res.status(400).send(value.error.details[0].message);
        }
    }

}

module.exports = new UserGroupController();
