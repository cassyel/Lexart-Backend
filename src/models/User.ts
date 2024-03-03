import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { randomUUID } from 'crypto';

interface UserAttributes {
  id: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt: Date = new Date();
  public readonly updatedAt: Date = new Date();
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: randomUUID()
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
    modelName: 'User',
    tableName: 'User',
    createdAt: true,
    updatedAt: true,
  }
);

User.sync({ force: true });

export default User;
