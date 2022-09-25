
const DataAccess = require('../data-access/groupsAccess.js');

export async function getAllGroupsService() {
	const dbResult = await DataAccess.fetchGroupsFromDB();
	return dbResult;
}

export async function getGroupService(id) {
	const dbResult = await DataAccess.fetchGroupFromDB(id);
	return dbResult;
}

export async function addGroupService(group) {
	const dbResult = await DataAccess.addGroupFromDB(group);
	return dbResult;
}

export async function updateGroupService(id) {
	const dbResult = await DataAccess.updateGroupFromDB(id);
	return dbResult;
}

export async function deleteGroupService(id) {
	const dbResult = await DataAccess.deleteGroupFromDB(id);
	return dbResult;
}
