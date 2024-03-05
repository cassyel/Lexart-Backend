import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelize from '../config/database';
import { randomUUID } from 'crypto';
import Variant from './Variant';

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
      defaultValue: () => randomUUID(),
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
    sequelize,
    modelName: 'Phone',
    tableName: 'Phone',
    createdAt: true,
    updatedAt: true,
  }
);

const VariantModel: ModelStatic<Variant> = Variant as ModelStatic<Variant>;
Phone.hasMany(VariantModel, { as: 'variants', foreignKey: 'phoneId', onDelete: 'CASCADE' });

Phone.sync();
// Phone.sync({ force: true });

export default Phone;
