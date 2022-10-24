import dotenv from "dotenv";
dotenv.config();

const {
    PORT,
    PG_USER,
    PG_PASSWORD,
    PG_HOST,
    PG_DATABASE,
    PG_DATABASE_TEST,
    PG_PORT,
} = process.env
export default {
    port: PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    db: PG_DATABASE,
    db_test: PG_DATABASE_TEST,
    db_port: PG_PORT
}