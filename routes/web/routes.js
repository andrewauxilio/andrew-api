/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
|
*/

exports.routesConfig = function (app) {
    app.get("/", (req, res) => {
        res.render("home");
    });
};