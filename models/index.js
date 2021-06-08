const Travellers = require('./travellers');
const Locations = require('./locations');
const Trips = require('./trips');
// require('dotenv').config();
var config = require(__dirname + '/../config/config.js')[env];


Travellers.belongsToMany(Locations, {
  through: {model: Trips},
  unique: false,
  onDelete: 'CASCADE',
});

Locations.belongsToMany(Travellers, {
  through: {model: Trips},
  unique: false,
  onDelete: 'CASCADE',
})

Travellers.hasOne(Trips, {
  foreignKey: 'traveller_id',
  onDelete: 'CASCADE'
})

Trips.belongsTo(Travellers, {
  foreignKey: 'reader_id',
});



module.exports = { Travellers, Locations, Trips };
