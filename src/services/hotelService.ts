import { Hotel } from '../models';
import { Op } from 'sequelize';

export class HotelService {
    static async getAllHotels(location?: string) {
        const filter = location ? { location: { [Op.like]: `%${location}%` } } : {};

        return await Hotel.findAll({ where: filter });
    }
}
