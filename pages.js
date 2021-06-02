const  mysql = require('mysql2');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const http = require('http');
const  db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
  });

router.get('/' , (req,res)=>{
    fs.readFile('demo.txt', function(err, data) {
        console.log('data++'+data);
         res.render('index.hbs',{data:data});
       });
   // res.render('index.hbs')
})
router.get('/register' , (req,res)=>{
    res.render('register.hbs')
})
router.get('/login',(req,res)=>{
    res.render('login.hbs')
})
router.get('/home' ,(req,res)=>{
    if(req.session.userId){
        var name , image;
        db.query('SELECT * FROM users where email = ?',[req.session.userId],(err,result)=>{
             name = result[0].name;
             image = result[0].image;
            console.log('name is '+name+"image name is "+image);
            return res.render('home.hbs',{name,image});
        })
    }else{
         res.redirect('/');
    }
})

router.get('/logout' , (req,res)=>{
    // res.clearCookie('jwt');
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;