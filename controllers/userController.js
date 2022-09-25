const { v4: uuidv4 } = require('uuid');
const url = require('url');
const db = require('../db.js');

import { User } from '../models/User.js';
import { userSchema } from '../schemas/userSchema.js';
import { getAllUsersService, 
         getUserService,
         addUserService, 
         updateUserService, 
         deleteUserService,
         getSuggestedUsersService
        } from '../services/userServices.js';

class UserController {

    async getUsers(req, res) {
        const { requestData } = req;
        const serviceResult = await getAllUsersService();
        res.send(serviceResult);
    }

    async getUser(req, res) {
        const id = req.params.id;
        const serviceResult = await getUserService(id);
        res.send(serviceResult);
    }

    async addUser(req, res) {
        const newUser = new User(uuidv4(), 'VladimirAlekseev', 'oanioge', 20, false);
        const value = userSchema.validate(newUser);
        if (!value.error) {
            const serviceResult = await addUserService(newUser);
            res.send(serviceResult);
        } else {
            res.status(400).send(value.error.details[0].message);
        }
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const serviceResult = await updateUserService(id);
        res.send(serviceResult);        
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        const serviceResult = await deleteUserService(id);
        res.send(serviceResult);         
    }

    async getSuggestedUsers(req, res) {
        const params = url.parse(req.url, true).query;
        const limit = params.limit;
        const loginSubstring = params.loginSubstring;
        const serviceResult = await getSuggestedUsersService(loginSubstring, limit);
        res.send(serviceResult);
    }
}

module.exports = new UserController();
