import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const user = await userModel.create(req.body)
        res.json({
            status : "SUCCESS",
            data : {...user},
            message: 'User created successfully',
        })

    } catch (error) {
        next(error);
    }

}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.getAllUsers();
        res.json({
            status: 'SUCCESS',
            data: users ,
            message: 'Users retreived successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.getUser(req.params.id as unknown as string);
        res.json({
            status: 'SUCCESS',
            data: user,
            message: 'User retreived successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
const updatedUser = await userModel.updateUser(req.body);
res.json({
            status: 'SUCCESS',
            data: updatedUser,
            message: 'User updated successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
const deletedUser = await userModel.deleteUser(req.params.id as unknown as string);
res.json({
            status: 'SUCCESS',
            data: deletedUser,
            message: 'User deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}

