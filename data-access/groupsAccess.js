const db = require('../db.js');

class DataAccess {

	async fetchGroupsFromDB() {
		const groups = await db.query('SELECT * FROM groups');
		if (groups) {
			return groups.rows;
		} else {
			return 'No groups yet';
		}
	} 

	async fetchGroupFromDB(id) {
        const group = await db.query('SELECT * FROM groups where id = $1',[id]);
        if (group) {
            return group.rows[0];
        } else {
            return 'Group does not exit';
        }
	}

	async addGroupFromDB(group) {
        const newGroup = await db.query(
            'INSERT INTO groups (name, permissions) values ($1, $2) RETURNING *', 
            [group.name, group.permissions]
        );
		if (newGroup) {
            return newGroup.rows[0];
        } else {
            return 'Group does not exist';
        }
	}

	async updateGroupFromDB(id) {
		const permissions = ["READ", "WRITE", "DELETE"];
		const group = await db.query(`UPDATE groups set permissions = '{READ, WRITE}' where id = $1 RETURNING *`, [id]);
		if (group) {		
            return group.rows[0];
        } else {
            return 'Group does not exist';
        }
	}

	async deleteGroupFromDB(id) {
		const group = await db.query('DELETE from groups where id = $1 RETURNING *', [id]);
		if (group) {
            return group.rows[0];
        } else {
            return 'Group does not exist';
        }		
	}
}

module.exports = new DataAccess();
