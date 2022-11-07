import dotenv from "dotenv";
dotenv.config();

const {
    PORT,
    NODE_ENV,
    PG_HOST,
    PG_PORT,
    PG_DB,
    PG_DB_TEST,
    PG_USER,
    PG_PASSWORD,
    BCRYPT_PASSWIRD,
    SALT_ROUNDS,
    TOKEN_SECRET
} = process.env

export default {
    host: PG_HOST,
    port: PORT,
    db_port: PG_PORT,
    db: NODE_ENV === 'dev' ? PG_DB : PG_DB_TEST,
    user: PG_USER,
    password: PG_PASSWORD,
    pepper: BCRYPT_PASSWIRD,
    salt: SALT_ROUNDS,
    tokenSecret:TOKEN_SECRET
}