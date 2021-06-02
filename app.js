const  mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const http = require('http');
const session = require('express-session')

// const router = require('./routes/pages')
// const auth = require('./routes/auth')
dotenv.config({path:'./.env'});
app.set('veiw engine' , 'hbs'); //template design
const pathDirecoty = path.join(__dirname , './public')
console.log(__dirname);
app.use(express.static(pathDirecoty));
app.use(express.urlencoded({extended:false}));
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(session({
  key:'user_id',
  secret: 'max',
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires:60000
  }

}))

const  db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
});


db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use('/' , require('./routes/pages'));
app.use('/auth' , require('./routes/auth'))

//http.createServer(function (req, res) {
 // fs.readFile('demo.txt', function(err, data) {
   // res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write(data);
    //return res.end();
  //  res.render('index.hbs',{data:data});
 // });
//}).listen(5004);

app.listen(5004 , ()=>{
  console.log('Server is running on the port 5004.....');
})