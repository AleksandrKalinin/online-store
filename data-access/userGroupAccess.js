const db = require('../db.js');

class DataAccess {

	async addUserToGroupDB(val) {
        const userGroup = await db.query(
            'INSERT INTO UserGroups (userId, groupId) values ($1, $2) RETURNING *', 
            [val.userId, val.groupId]
        );
		if (userGroup) {
            return (userGroup.rows[0]);
        } else {
            return 'User not found';
        }
	}

}

module.exports = new DataAccess();
