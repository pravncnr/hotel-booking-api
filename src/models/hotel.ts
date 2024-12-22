// src/models/hotel.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the interface for Hotel attributes
export interface HotelAttributes {
    id: number;
    name: string;
    location: string;
    total_rooms: number;
}

// Create and export the Hotel model factory function
export default (sequelize: Sequelize) => {
    class Hotel extends Model<HotelAttributes> implements HotelAttributes {
        public id!: number;
        public name!: string;
        public location!: string;
        public total_rooms!: number;

        // Timestamps
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    // Initialize the Hotel model
    Hotel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            total_rooms: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'hotel',
            timestamps: true,
            underscored: true,
        }
    );

    return Hotel;
};
