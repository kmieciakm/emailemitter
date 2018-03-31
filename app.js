let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
const PORT = 3000;

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
    let data = req.body;
    //create output
    const footerPL = "Siema MS";
    const footerEN = "Hello Mekka Street";
    let outputHTML = `
        <h1>${data.title}</h1>
        <p>${data.message}</p>`;
    if(data.lang==="en")
        outputHTML += footerEN;
    else    
        outputHTML += footerPL;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: data.host,
          pass: data.pass
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `"${data.company}" ${data.host}`, // sender address
        to: '', // list of receivers
        subject: data.title, // Subject line
        html: outputHTML // html body
    };

    function sendEmails(){
        return new Promise(function(resolved,reject){
            let promises = [];
            let newArr = [...data.emailslist];
            
            for(var i=0; i<newArr.length; i++){
                let current = newArr[i];
                promises.push(new Promise((resolve,reject)=>{
                    mailOptions.to = current;
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        } 
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));   
                        resolve();
                    });
                }));
            }
            Promise.all(promises).then( () => resolved());
        });
    }

    sendEmails().then( () =>{
        res.json(data.emailslist.length);
    }).catch( err => console.log(err));

});

app.get('/sent',(req,res) => {
    res.render('sent',{
        data: req.query
    })
    res.end();
});

//server
app.listen(PORT,() => {console.log(`Server is running on port ${PORT}`)});