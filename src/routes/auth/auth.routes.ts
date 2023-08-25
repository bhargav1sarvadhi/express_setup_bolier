import { userValidation } from '../../validation/basic.Validation';
import { authController, userController } from '../../controller/index';
import BaseRoute from '../base.routes';
import passport from 'passport';

class AuthRoutes extends BaseRoute {
    
    async initializeRoutes() {
        this.router.post('/login', authController.login)
        this.router.post('/signup',userValidation,userController.create.bind(userController))
    }
}
export  const authRoutes = new AuthRoutes().router;