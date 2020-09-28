const express = require('express');
const router  = express.Router();
const HeroeDocument = require('../models/HeroeDocument')
const { response } = require('express');

router.post('/remove-heroe-document', (req, res, next) =>{ 
  let newHeroeDocument = {
    heroeDocumentId: req.body.heroeDocumentId,
  }

  HeroeDocument
    .deleteOne({ _id: newHeroeDocument.heroeDocumentId })
    .then(()=>{
      res.status(200).json("Heroe succesfully deleted!");
    })
    .catch(error =>{
      console.log(error);
  })
})

module.exports = router;