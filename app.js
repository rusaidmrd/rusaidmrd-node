const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
var ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//const flash = require('connect-flash');
const flash = require('express-flash');

const ENV = require('dotenv');
ENV.config();


const app = express();
const PORT = process.env.PORT || 3000;
const baseUrl = 'http://localhost:3000/#contact-me';


// view engine setup
//app.engine('handlebars', hbs());
app.set('view engine', 'ejs');



app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());


// static folder
app.use('/build/assets', express.static(path.join(__dirname, 'build/assets')));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', { msg: '' });
});

app.post('/', (req, res) => {
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

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'rusaidpro@gmail.com',
        from: req.body.email,
        subject: 'Email from rusaidmrd.com',
        text: 'Freelance web developer',
        html: output,
    };

    sgMail
        .send(msg, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                handleRedirect(req, res);
                // res.redirect(baseUrl);
            }
        });

});


function handleRedirect(req, res) {
    res.render('index', { msg: 'Tnanks for your message, I\'ll be in touch soon !!' });
}

app.listen(PORT, () => console.log('Server Started at ' + PORT));