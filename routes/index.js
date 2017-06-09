var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});
router.post('/login',function(req,res){
  var name=req.body.name;
  req.session.name=name;
  res.send("success");
});
router.get('/index',function(req,res){
  if(req.session.name!=null && req.session.name!=""){
    res.render('index',{name:req.session.name});
  }else{
    res.redirect('/');
  }
});
module.exports = router;
