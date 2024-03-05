import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelize from '../config/database';
import Phone from './Phone';
import { randomUUID } from 'crypto';

interface VariantAttributes {
  id: string;
  phoneId: string;
  price: number;
  color: string;
}

interface VariantCreationAttributes extends Optional<VariantAttributes, 'id'> {}

class Variant extends Model<VariantAttributes, VariantCreationAttributes> implements VariantAttributes {
  public id!: string;
  public phoneId!: string;
  public price!: number;
  public color!: string;
}

Variant.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: () => randomUUID(), // Use uma função para gerar um novo UUID
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Variant',
    tableName: 'Variant',
    createdAt: false,
    updatedAt: false,
  }
);


const PhoneModel: ModelStatic<Phone> = Phone as ModelStatic<Phone>;
Variant.belongsTo(PhoneModel, { as: 'phone', foreignKey: 'phoneId', onDelete: 'CASCADE' });

Variant.sync();
// Variant.sync({ force: true });

export default Variant;
