const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trips extends Model {}

Trips.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    traveller_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    traveller_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'travellers',
        key: 'id',
      },
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'locations',
            key: 'id',
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trips',
  }
);

module.exports = Trips;
