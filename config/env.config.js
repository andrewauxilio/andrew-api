require('dotenv/config');

module.exports = {
    "port": process.env.PORT,
    "db_connection": process.env.DB_CONNECTION,
    "jwt_secret": process.env.JWT_KEY,
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
};
