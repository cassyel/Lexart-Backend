import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Phone from './Phone';

class Variant extends Model {
  public id!: number;
  public phoneId!: number; // Chave estrangeira referenciando Phone.id
  public price!: number;
  public color!: string;
}

Variant.init(
  {
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Variant',
    tableName: 'Variant',
    createdAt: false,
    updatedAt: false
  }
);

// Adicionando a associação de muitos-para-um (Variant belongsTo Phone)
Variant.belongsTo(Phone, { as: 'phone', foreignKey: 'phoneId' });

export default Variant;
