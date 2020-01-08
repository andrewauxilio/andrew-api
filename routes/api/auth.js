/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Here is where you can register authentican routes for your application.
| Auth Controller: ../../controllers/AuthController
|
*/

const AuthController = require('../../controllers/AuthController');
const AuthValidationMiddleware = require('../../middleware/auth/auth.validation.middleware');
const VerifyUserMiddleware = require('../../middleware/auth/verify.user.middleware');


exports.routesConfig = function (app) {
    app.post('/auth', [
        // VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthController.login
    ]);
};