//-----------------------------------------------------//
//                        MAIN                         //
//-----------------------------------------------------//
// Initializes the server and connects everything.     //
//-----------------------------------------------------//
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet')
const path = require('path');
const config = require('./config/env.config');


//Database Connection
mongoose.connect(config.db_connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database...'))
    .catch(err => console.error(err));

//Middlewares
app.set("view engine", "pug");
app.set("views");
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

//Routes
const UserRouter = require('./routes/api/user');
const AuthRouter = require('./routes/api/auth');
const PostRouter = require('./routes/api/post');
const WebRouter = require('./routes/web/routes');

UserRouter.routesConfig(app);
AuthRouter.routesConfig(app);
PostRouter.routesConfig(app);
WebRouter.routesConfig(app);

//Server Init
app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
