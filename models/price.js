var mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
var userSchema = {
  uid: 'String',
  bsgId: 'String',
  name: 'String',
  shortName: 'String',
  price: 'Number',
  avg24hPrice: 'Number',
  avg7daysPrice: 'Number',
  traderName: 'String',
  traderPrice: 'Number',
  traderPriceCur: 'String',
  updated: 'String',
  slots: 'Number',
  diff24h: 'Number',
  diff7days: 'Number',
  icon: 'String',
  link: 'String',
  wikiLink: 'String',
  img: 'String',
  imgBig: 'String',
  reference: 'String'
};
module.exports = mongoose.model('price', userSchema);