const express = require('express');
const router  = express.Router();
const HeroeDocument = require('../models/HeroeDocument')
const { response } = require('express');

router.get('/all-heroes', (req, res, next) =>{  
  HeroeDocument
    .find({})
    .then((allHeroes)=>{
      res.status(200).json(allHeroes);
    })
    .catch(error =>{
      console.log(error);
  })
})

module.exports = router;