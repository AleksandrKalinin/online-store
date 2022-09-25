
const DataAccess = require('../data-access/usersAccess.js');

export async function getAllUsersService() {
	const dbResult = await DataAccess.fetchUsersFromDB();
	return dbResult;
}

export async function getUserService(id) {
	const dbResult = await DataAccess.fetchUserFromDB(id);
	return dbResult;
}

export async function addUserService(user) {
	const dbResult = await DataAccess.addUserFromDB(user);
	return dbResult;
}

export async function updateUserService(id) {
	const dbResult = await DataAccess.updateUserFromDB(id);
	return dbResult;
}

export async function deleteUserService(id) {
	const dbResult = await DataAccess.deleteUserFromDB(id);
	return dbResult;
}

export async function getSuggestedUsersService(loginSubstring, limit) {
	const dbResult = await DataAccess.fetchSuggestedUsers(loginSubstring, limit);
	return dbResult;
}