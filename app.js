let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
let PORT = 3000;

let app = express();
//body-parser ---- view engine ----- middleware
app.set('view engine', "ejs");
app.use('/assets', express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//route
app.get('/', (req,res) => {
    res.render('form');
});
app.post('/formdata',(req,res) => {
    console.log(req.body);
    res.send(req.body);
});

//server
app.listen(PORT,() => {console.log(`Server is running on port ${PORT}`)});