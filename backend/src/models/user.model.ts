import db from '../database'
import User from '../types/user.type'
import config from "../config"
import bcrypt from "bcrypt"

const hashedPassword = (password: string) => {
    const salt = parseInt(config.salt as  string, 10)
    const hash = bcrypt.hashSync(`${password}${config.pepper}`, salt)
    return hash;
}

class UserModel {
    // Create User
    async create(u: User): Promise<User> {
        try {
            // open connection to db
            const conn = await db.connect()
            // sql query
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
                        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            // run query
            const result = await conn.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashedPassword(u.password),
            ])

            // release connection
            conn.release()

            // return created user
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to create ${u.user_name} : ${(error as Error).message}`
            )
        }
    }

    // get all users
    async getAllUsers(): Promise<User[]> {
        try {
            // open connection to db
            const conn = await db.connect()
            // sql query
            const sql = `SELECT id, email, user_name, first_name, last_name FROM users`
            // run query
            const result = await conn.query(sql)

            // release connection
            conn.release()

            // return created user
            return result.rows
        } catch (error) {
            throw new Error(
                `Error at retrieving users ${(error as Error).message}`
            )
        }
    }
    // get specific user
    async getUser(id: string): Promise<User> {
        try {
            // open connection to db
            const conn = await db.connect()
            // sql query
            const sql = `SELECT id, email, user_name, first_name, last_name
                        FROM users WHERE id=($1)`;
            // run query
            const result = await conn.query(sql ,[id])

            // release connection
            conn.release()

            // return created user
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Error at retrieving user ${(error as Error).message}`
            )
        }
    }
    // update user
    async updateUser(u: User): Promise<User>{
        try {
            // open connection to db
            const conn = await db.connect()
            // sql query
            const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5
                         WHERE id=$6
                         RETURNING  id, email, user_name, first_name, last_name`
            // run query
            const result = await conn.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashedPassword(u.password),
                u.id,
            ])

            // release connection
            conn.release()

            // return created user
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Can't Update user ${(u.user_name)}, ${(error as Error).message}`
            )
        }
    }
    // delete user

    async deleteUser(id: string): Promise<User>{
        try {
            // open connection to db
            const conn = await db.connect()
            // sql query
            const sql = `DELETE FROM users
                        WHERE id=($1)
                        RETURNING  id,email,user_name,first_name,last_name`
            // run query
            const result = await conn.query(sql, [id]);
            // release connection
            conn.release()

            // return created user
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Can't delete user ${id}, ${(error as Error).message}`
            )
        }
    }
    // authenticate user
    async authenticate(email: string,password: string) : Promise<User | null> {
        try {
            const conn= await db.connect();
            const sql = 'SELECT password FROM users WHERE email=($1)';
            const result = await conn.query(sql, [email])
            // User exist
            if (result.rows.length){
                // Check password
                const {password: hashedPassword} = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashedPassword
                )

                // PASSWORD TRUE
                if (isPasswordValid) {
                    const userInfo = await conn.query(
                        'SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)',
                        [email]
                    )

                    return userInfo.rows[0]
                }

            }
            conn.release();
            return null;
        }

        catch (error) {
            throw new Error(`Unable to login: ${(error as Error).message}`)
        }
    }
}

export default UserModel;
