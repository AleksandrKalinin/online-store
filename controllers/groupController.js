const { v4: uuidv4 } = require('uuid');
const url = require('url');
const db = require('../db.js');

import { Group } from '../models/Group.js';
import { groupSchema } from '../schemas/groupSchema.js';


import { getAllGroupsService, 
         getGroupService,
         addGroupService, 
         updateGroupService, 
         deleteGroupService
        } from '../services/groupServices.js';

class GroupController {

    async getGroups(req, res) {
        const { requestData } = req;
        const serviceResult = await getAllGroupsService();
        res.send(serviceResult);
    }

    async getGroup(req, res) {
        const id = req.params.id;
        const serviceResult = await getGroupService(id);
        res.send(serviceResult);
    }

    async addGroup(req, res) {
        const newGroup = new Group(uuidv4(), 'TEST', ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES', 'DELETE']);
        console.log(newGroup);
        const value = groupSchema.validate(newGroup);
        if (!value.error) {
            const serviceResult = await addGroupService(newGroup);
            res.send(serviceResult);
        } else {
            res.status(400).send(value.error.details[0].message);
        }
    }

    async updateGroup(req, res) {
        const id = req.params.id;
        const serviceResult = await updateGroupService(id);
        res.send(serviceResult);        
    }

    async deleteGroup(req, res) {
        const id = req.params.id;
        const serviceResult = await deleteGroupService(id);
        res.send(serviceResult);         
    }
}

module.exports = new GroupController();
