// import {  Model } from 'sequelize';
// import { sequelize } from '../config/database';
// import Phone from './Phone';

// class PhoneVariant extends Model {
//   public id!: number;
// }

// PhoneVariant.init(
//   {},
//   {
//     sequelize: sequelize,
//     modelName: 'PhoneVariant',
//   }
// );

// // Adicionando a associação de um-para-muitos (Phone hasMany PhoneVariant)
// Phone.hasMany(PhoneVariant, { as: 'variants', foreignKey: 'phoneId' });
// // Adicionando a associação de um-para-um (PhoneVariant belongsTo Phone)
// PhoneVariant.belongsTo(Phone, { as: 'phone', foreignKey: 'phoneId' });

// export default PhoneVariant;
