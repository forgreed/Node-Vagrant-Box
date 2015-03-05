// ---------- Index Route ---------- //

var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'An express app',
    text: 'This is my test page'
  });
});

module.exports = router;