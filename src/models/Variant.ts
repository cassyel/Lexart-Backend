import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
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
      defaultValue: () => randomUUID(),
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

// Variant.sync();
// Variant.sync({ force: true });

export default Variant;
