import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Phone extends Model {
  public id!: number;
  public name!: string;
  public brand!: string;
  public model!: string;
}

Phone.init(
  {
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
    tableName: 'Phone', // Defina o nome da tabela aqui
    createdAt: false,
    updatedAt: false
  }
);

export default Phone;
