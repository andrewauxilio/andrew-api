/*
|--------------------------------------------------------------------------
| Post Routes
|--------------------------------------------------------------------------
|
| Here is where you can register post routes for your application.
| Post Controller: ../../controllers/PostController
|
*/

const PostController = require('../../controllers/PostController');
const PermissionMiddleware = require('../../middleware/auth/auth.permission.middleware');
const ValidationMiddleware = require('../../middleware/auth/auth.validation.middleware');
const config = require('../../config/auth.config');

const ADMIN = config.ADMIN;

exports.routesConfig = function (app) {
    app.post('/posts', [
        PostController.insert
    ]);
    app.get('/posts', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostController.list
    ]);
    app.get('/posts/:postId', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySamePostOrAdminCanDoThisAction,
        PostController.getById
    ]);
    app.patch('/posts/:postId', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySamePostOrAdminCanDoThisAction,
        PostController.patchById
    ]);
    app.delete('/posts/:postId', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PostController.removeById
    ]);
};
