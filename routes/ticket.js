var express = require('express');
var router = express.Router();

//GET token page
router.get('/ticket', function (req, res, next) {
  res.render('ticket');
});

module.exports = router;
