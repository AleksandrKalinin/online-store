const db = require('../db.js');

class DataAccess {
    async registerAdminDB(admin) {
        const newAdmin = await db.query(
            'INSERT INTO administrators (username, password) values ($1, $2) RETURNING *',
            [admin.username, admin.password]
        );
        return 'New administrator registered!';
    }

    async checkAdminDB() {
        const admin = await db.query('SELECT * FROM administrators');
        if (admin) {
            return admin.rows;
        }
        return 'User not found';
    }
}

module.exports = new DataAccess();
