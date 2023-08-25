import { Model } from 'sequelize';

interface User extends Model{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: 'admin' | 'user';
    authenticate(password: string): boolean | string;
}

export {
    User
};