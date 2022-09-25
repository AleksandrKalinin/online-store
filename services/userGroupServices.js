const DataAccess = require('../data-access/userGroupAccess.js');

export async function addUserToGroupService(val) {
	const dbResult = await DataAccess.addUserToGroupDB(val);
	return dbResult;
}

