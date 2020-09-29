const express = require('express');
const router  = express.Router();
const HeroeDocument = require('../models/HeroeDocument')
const { response } = require('express');

router.post('/edit-heroe-document', (req, res, next) =>{ 
  let newHeroeDocument = {
    heroeDocumentId: req.body._id,
    name: req.body.name,
    description: req.body.description,
    superPowers: req.body.superPowers 
  }

  HeroeDocument
    .findOneAndUpdate({_id : newHeroeDocument.heroeDocumentId}, { $set: {name: newHeroeDocument.name, description: newHeroeDocument.description, superPowers : newHeroeDocument.superPowers} }, {new: true})
    .then((heroe)=>{
      res.status(200).json(heroe);
    })
    .catch(error =>{
      console.log(error)
  })
})

module.exports = router;