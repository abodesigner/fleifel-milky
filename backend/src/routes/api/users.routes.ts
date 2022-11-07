import { Router } from 'express'

import * as controllers from '../../controllers/users.controllers'

const userRoutes = Router()

userRoutes.post('/', controllers.create)
userRoutes.get('/', controllers.getAllUsers)
userRoutes.get('/:id', controllers.getUser)
userRoutes.patch('/:id', controllers.updateUser)
userRoutes.delete('/:id', controllers.deleteUser)
userRoutes.post('/auth', controllers.authenticate)

export default userRoutes
