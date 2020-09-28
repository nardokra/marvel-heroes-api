const express = require('express');
const router  = express.Router();
const HeroeDocument = require('../models/HeroeDocument')
const { response } = require('express');

router.post('/add-heroe-document', (req, res, next) =>{  
  let newHeroeDocument = {
    name: req.body.name,
    description: req.body.description,
    superPowers: req.body.superPowers 
  }

  HeroeDocument
    .create(newHeroeDocument)
    .then((heroe)=>{
      res.status(200).json(heroe);
    })
    .catch(error =>{
      console.log(error);
  })
})

module.exports = router;