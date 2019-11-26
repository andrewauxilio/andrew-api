/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
|
| Here is where you can register user routes for your application.
| User Controller: ../../controllers/UserController
|
*/

const UserController = require('../../controllers/UserController');
const PermissionMiddleware = require('../../middleware/auth/auth.permission.middleware');
const ValidationMiddleware = require('../../middleware/auth/auth.validation.middleware');
const config = require('../../config/auth.config');

const ADMIN = config.ADMIN;
const PAID = config.PAID_USER
const FREE = config.NORMAL_USER

exports.routesConfig = function (app) {
    app.post('/users', [
        UserController.insert
    ]);
    app.get('/users', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UserController.list
    ]);
    app.get('/users/:userId', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.getById
    ]);
    app.patch('/users/:userId', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.patchById
    ]);
    app.delete('/users/:userId', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UserController.removeById
    ]);
};
