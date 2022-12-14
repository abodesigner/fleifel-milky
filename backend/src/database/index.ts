import { Pool } from 'pg';
import config from "../config";

const pool = new Pool({
    host : config.host,
    database: config.db,
    user: config.user,
    password: config.password,
    port : parseInt(config.db_port as string, 10)
})

pool.on('error', (error: Error) => {
    console.log(error.message)
})

export default pool;