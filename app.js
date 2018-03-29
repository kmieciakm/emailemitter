let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
let PORT = 3000;

let app = express();
//body-parser ---- view engine ----- middleware
let urlencodeParser = bodyParser.urlencoded({ extended: false});
app.set('view engine', "ejs");
app.use('/assets', express.static(__dirname+'/public'));

//route
app.get('/', (req,res) => {
    res.render('form');
});
app.post('/formdata', urlencodeParser, function(req,res){
    let data = req.body;
    data.trush = 45;
    res.send(data);
});

//server
app.listen(PORT,() => {console.log(`Server is running on port ${PORT}`)});