import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
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
    tableName: 'User', // Defina o nome da tabela aqui
    createdAt: false,
    updatedAt: false
  }
);

User.sync({ force: true });

export default User;
