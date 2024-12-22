import { User } from '../models';
import { Op } from 'sequelize';

export class UserService {
    static async getAllUsers() {
        return await User.findAll();
    }
}
