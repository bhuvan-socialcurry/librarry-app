var express = require('express');
var jwt =require('jsonwebtoken')
var User = require('../models/user.js')
var Book = require('../models/books.js')
var router = express.Router();
const passport = require('passport');
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("this is a request",req.body)
  User.find({username:req.body.username}).then(function(sucess){
    // console.log("this is working in",sucess);
    if(req.body.password.localeCompare(sucess.password))
    {
      const payload = { password: sucess.password, id: sucess._id };
      jwt.sign(payload, "top_secret", 
          (err, token) => {
              if (token) {
                sucess.auth_token=token
                console.log("this is suces",sucess);
               User.updateOne({username:sucess.username},{auth_token:token}).then(function(saved_user){
                  console.log("this is user with token",saved_user)
                  res.json({ success: true, token: token, message: "login successful" });
                })
                //res.json({ success: true, token: token, message: "login successful" });
              } else {
                  res.json({ success: false, token: err, message: "login failed" });
              }
          });

    }
    else{
      res.send("incorrect password")
    }
  },function(err){
    res.send("Username incorrect")
  })
});

router.get('/books',passport.authenticate('bearer', { session : false }),function(req,res,next){
  console.log("this is a function for code")
  Book.find().then(function(params) {
    console.log("we got something",params);
    res.json(params)
  })
  
})
module.exports = router;
