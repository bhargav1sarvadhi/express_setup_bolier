import { db } from '../../model';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { ERRORTYPES, RES_TYPES } from '../../constant';
import { AppError } from '../../utils';

 class AuthController {

    async login(req, res, next) {
        try {
            const { body: { email, password }} = req;
            const result = await db.userModel.findOne({ where: { email }});
            if (result && result.authenticate(password)) {
                const payload = {
                    id: result.id,
                    Email: result.email
                };
                const token = jwt.sign(
                    payload,
                    process.env.JWT_SECERET,
                    { expiresIn: process.env.JWT_EXP, algorithm: 'HS256' }
                );
                return res.status(200).json({
                    success: true,
                    data: token,
                    message: RES_TYPES.LOGIN
                });
            } else {
                return next(new AppError(RES_TYPES.AUTH_FAIL, ERRORTYPES.UNAUTHORIZED));
            }
        } catch (err) {
            return next(err);
        }
    }
}

export const authController =  new AuthController()