import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import { userModel } from '../model/userModel';
import { otpModel } from './otpModel';

export const db = {
    Sequelize,
    sequelize,
    userModel,
    otpModel

};

db.sequelize.sync();