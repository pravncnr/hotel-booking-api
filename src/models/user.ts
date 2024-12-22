// src/models/user.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the interface for User attributes
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Create and export the User model factory function
export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  // Initialize the User model
  User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: true,
        underscored: true,
      }
  );

  return User;
};
