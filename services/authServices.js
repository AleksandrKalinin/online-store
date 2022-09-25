const DataAccess = require('../data-access/authAccess.js');

export async function checkAdminService() {
    const dbResult = await DataAccess.checkAdminDB();
    return dbResult;
}

export async function registerAdminService(admin) {
    const dbResult = await DataAccess.registerAdminDB(admin);
    return dbResult;
}
