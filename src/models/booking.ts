// src/models/booking.ts
import { Model, DataTypes, Sequelize } from 'sequelize';
import User  from './user'; // Assuming User model is exported from user.ts
import Hotel  from './hotel'; // Assuming Hotel model is exported from hotel.ts

// Define the interface for Booking attributes
export interface BookingAttributes {
    id: number|null;
    hotel_id: number;
    user_id: number;
    rooms: number;
    checkin: Date;
    checkout: Date;
    created_at: Date;
    updated_at: Date;
}

// Create and export the Booking model factory function
export default (sequelize: Sequelize) => {
    class Booking extends Model<BookingAttributes> implements BookingAttributes {
        public id!: number;
        public hotel_id!: number;
        public user_id!: number;
        public rooms!: number;
        public checkin!: Date;
        public checkout!: Date;
        public created_at!: Date;
        public updated_at!: Date;

        // Timestamps
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    // Initialize the Booking model
    Booking.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            hotel_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'hotel',
                    key: 'id',
                },
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            rooms: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            checkin: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            checkout: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: 'booking',
            timestamps: false,
            underscored: true,
        }
    );

    return Booking;
};
