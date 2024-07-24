var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    /* 1. Renderización de la vista template.ejs */
    res.render('template_login', { title: 'Express' });
     
  });
 
  module.exports = router;