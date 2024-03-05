import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async comparePassword(userPassword: string): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => randomUUID(), // Use uma função para gerar um novo UUID
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
    createdAt: 'createdAt', // Corrija o tipo para corresponder à definição do modelo
    updatedAt: 'updatedAt', // Corrija o tipo para corresponder à definição do modelo
  }
);

// User.sync();
// User.sync({ force: true });

export default User;
