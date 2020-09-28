const mongoose = require('mongoose');
const { ObjectId, Date } = require('mongoose');
const Schema = mongoose.Schema;

const heroeDocument = new Schema({
  name: { type: String }, 
  description: { type: String }, 
  superPowers: { type: String }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const HeroeDocument = mongoose.model('HeroeDocument', heroeDocument, 'heroeDocuments');

module.exports = HeroeDocument;