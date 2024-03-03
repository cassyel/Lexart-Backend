import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { randomUUID } from 'crypto';

interface PhoneAttributes {
  id: string;
  name: string;
  brand: string;
  model: string;
}

interface PhoneCreationAttributes extends Optional<PhoneAttributes, 'id'> {}

class Phone extends Model<PhoneAttributes, PhoneCreationAttributes> implements PhoneAttributes {
  public id!: string;
  public name!: string;
  public brand!: string;
  public model!: string;

  public readonly createdAt: Date = new Date();
  public readonly updatedAt: Date = new Date();
}

Phone.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: () => randomUUID(), // Use uma função para gerar um novo UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Phone',
    tableName: 'Phone',
    createdAt: true,
    updatedAt: true
  }
);

Phone.sync();
// Phone.sync({ force: true });

export default Phone;
