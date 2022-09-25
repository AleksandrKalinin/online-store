const Router = require('express');

const router = new Router();

const userController = require('./controllers/userController.js');
const groupController = require('./controllers/groupController.js');
const userGroupController = require('./controllers/userGroupController.js');

const authController = require('./controllers/authController.js');

const middleware = require('./middlewares/authMiddleware.js');


 router.get('/error', function(req, res, next) {
      return next(new Error("This is an error and it should be logged to the console"));
    });

router.get('/users', userController.getUsers);

router.get('/users/:id', userController.getUser);

router.delete('/users/:id', userController.deleteUser);

router.put('/users/:id', userController.updateUser);

router.post('/users', userController.addUser);

router.get('/suggested', userController.getSuggestedUsers);

router.get('/groups', middleware.checkToken, groupController.getGroups);

router.get('/groups/:id', middleware.checkToken, groupController.getGroup);

router.delete('/groups/:id', middleware.checkToken, groupController.deleteGroup);

router.put('/groups/:id', middleware.checkToken, groupController.updateGroup);

router.post('/groups', middleware.checkToken, groupController.addGroup);

router.post('/groups/add', middleware.checkToken, userGroupController.addUserGroup);

router.post('/login', authController.generateAccessToken);

router.post('/register', authController.registerAdmin);


router.post('/test', (req, res) => {
	res.sendStatus(200);
})

module.exports = router;
