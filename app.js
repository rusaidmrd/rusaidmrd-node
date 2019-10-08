const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const ENV = require('dotenv');
ENV.config();


const app = express();

const PORT = process.env.PORT || 3000;

// view engine setup
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');


// static folder
app.use('/build/assets', express.static(path.join(__dirname, 'build/assets')));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact details</h3>
        <ul>
            <li>Name : ${req.body.name}</li>
            <li>Email : ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // console.log('Name is : ' + req.body.name);
    // console.log('Email is : ' + req.body.email);
    // console.log('Message is : ' + req.body.message);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.gmtranslationdoha.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'info@gmtranslationdoha.com', // generated ethereal user
            pass: 'k4J6Z18hhi286998' // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"gmtranslationdoha.com contact 👻" <info@gmtranslationdoha.com>', // sender address
        to: 'rusaidpro@gmail.com', // list of receivers
        subject: 'Email from rusaidmrd.com ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('index', { msg: 'Email has been sent' });

    });



});

app.listen(PORT, () => console.log('Server Started at ' + PORT));