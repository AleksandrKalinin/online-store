const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
import { Admin } from '../models/Admin.js';
import { adminSchema } from '../schemas/adminSchema.js';
import { registerAdminService,
    checkAdminService
} from '../services/authServices.js';

dotenv.config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;


const generateAccessToken = (username) => {
    const payload = {
        username
    };
    return jwt.sign(payload, SECRET_TOKEN, { expiresIn: '1h' });
};

class AuthController {

    async registerAdmin(req, res) {
        const { username, password } = req.body;
        const encryptedPassword = bcrypt.hashSync(password, 10);
        const newAdmin = new Admin(uuidv4(), username, encryptedPassword);
        const value = adminSchema.validate(newAdmin);

        if (value.error) {
            res.status(400).send(value.error.details[0].message);
        }

        const administrators = await checkAdminService();
        const foundAdmin = administrators.find((admin) => {
            if (admin.username === username) {
                return true;
            }
        })

        if (foundAdmin) {
            res.status(400).send("User with such name already exists");
        } else {
            const serviceResult = await registerAdminService(newAdmin);
            res.send(serviceResult);            
        }   

        console.log('New administrator registered');
    }

    async generateAccessToken(req, res) {
        try {
            const { username, password } = req.body;
            const administrators = await checkAdminService();

            if (!administrators) {
                return res.status(400).json({ message: 'There are no administrators' });
            }

            const foundAdmin = administrators.find((admin) => {
                if (admin.username === username) {
                    return true;
                }
            })

            if (!foundAdmin) {
                return res.status(400).json({ message: 'No administrators with such username!' });
            }

            const checkPass = bcrypt.compareSync(password, foundAdmin.password);

            if (!checkPass) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            const token = generateAccessToken(foundAdmin.username);
            res.send(token);
        } catch (e) {
            res.status(400).json({ message: 'Login error' });
        }
    }
}

module.exports = new AuthController();
