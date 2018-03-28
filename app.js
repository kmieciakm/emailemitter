let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
let PORT = 3000;

let app = express();

//view engine
app.set('view engine', "ejs");
//middleware
app.use('/assets', express.static(__dirname+'/public'));
//route
app.get('/', (req,res) => {
    res.render('form');
});
//server
app.listen(PORT,() => {console.log(`Server is running on port ${PORT}`)});