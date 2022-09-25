const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
import { checkAdminService } from '../services/authServices.js';

dotenv.config();

const SECRET_TOKEN = process.env.SECRET_TOKEN;

export async function checkToken(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        if (!(req.headers.authorization.split(' ')[1])) {
            return res.status(401).json({ message: 'Authorisation token is absent!' });
        }
        
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Invalid token!' });
        }

        const administrators = await checkAdminService();
        const verified = jwt.verify(token, SECRET_TOKEN);

        const foundAdmin = administrators.find((admin) => {
            if (admin.username === verified.username) {
                return true;
            }
        })

        if (!foundAdmin) {
            return res.status(403).json({ message: 'Invalid token 2!' });
        }

        next();
    } catch {
        return res.status(403).json({ message: 'User not authorized' });
    }
}
