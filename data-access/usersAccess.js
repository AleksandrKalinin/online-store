const db = require('../db.js');

class DataAccess {

	async fetchUsersFromDB() {
		const users = await db.query('SELECT * FROM users');
		if (users) {
			return users.rows;
		} else {
			return 'No users yet';
		}
	} 

	async fetchUserFromDB(id) {
        const user = await db.query('SELECT * FROM users where id = $1',[id]);
        if (user) {
            return user.rows[0];
        } else {
            return 'User not found';
        }
	}

	async addUserFromDB(user) {
        const newPerson = await db.query(
            'INSERT INTO users (login, password, age, isDeleted) values ($1, $2, $3, $4) RETURNING *', 
            [user.login, user.password, user.age, user.isDeleted]
        );
		if (newPerson) {
            return newPerson.rows[0];
        } else {
            return 'User not found';
        }
	}

	async updateUserFromDB(id) {
		const user = await db.query('UPDATE users set age = 45 where id = $1 RETURNING *', [id]);
		if (user) {
            return user.rows[0];
        } else {
            return 'User not found';
        }
	}

	async deleteUserFromDB(id) {
		const user = await db.query('DELETE from users where id = $1', [id]);
		if (user) {
            return 'User succesfully deleted!';
        } else {
            return 'User not found';
        }		
	}

	async fetchSuggestedUsers(loginSubstring, limit) {
 		const users = await db.query('SELECT * FROM users');
        const newUsers = users.rows.filter(user => user.login.startsWith(loginSubstring)).slice(0, limit);
		if (newUsers) {
            return newUsers;
        } else {
            return 'No suggested users found';
        }
	}

}

module.exports = new DataAccess();
