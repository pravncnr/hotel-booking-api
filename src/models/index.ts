// src/models/index.ts
import { Sequelize } from 'sequelize';
import UserModel from './user';
import HotelModel from './hotel';
import BookingModel from './booking';

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
);

const User = UserModel(sequelize);
const Hotel = HotelModel(sequelize);
const Booking = BookingModel(sequelize);

// Define relationships after models are initialized
Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Hotel, { foreignKey: 'hotel_id' });

// Sync database
sequelize.sync({ alter: true })
    .then(() => console.log('Database & tables created!'))
    .catch((err) => console.error('Error syncing database:', err));

export { sequelize, User, Hotel, Booking };
