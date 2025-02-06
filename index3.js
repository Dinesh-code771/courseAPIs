//DYNAMIC ROUTES
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });

//JOI VALIDATION
//npm i joi
// const Joi = require('joi');
// app.post('/api/posts', (req, res) => {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     const result = Joi.validate(req.body, schema);
//     if(result.error) {
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }

//     const post = {
//         id: posts.length + 1,
//         name: req.body.name
//     };
//     posts.push(post);
//     res.send(post);
// });

/// custome middele function

// app.use((function(req, res, next) {
//     console.log('Time:', Date.now());
//     next(); // if dont do this request will be left hanging
// }));

//dont write all middle ware in one file
// create logger.js file and write the code there and export from there

//built-in middleware
//urlencoded app.use(express.urlencoded({extended: true}));
//static app.use(express.static('public'));
// create public folder and put all static files there
//let say we have readme.txt file in public folder
//localhost:3000/readme.txt will show the file content

//third party middleware
//example helmet
// const helmet = require('helmet');

// app.use(helmet()); //for security purpose
//morgan is used for logging
// const morgan = require('morgan');
// app.use(morgan('tiny')); //for logging

//enivronment variable
//enable diable mode (ex dev, production) logging only in dev
//process.env.NODE_ENV //undefined by default
//app.get('env') //development by default
//if(process.env.NODE_ENV === 'development') {
//    app.use(morgan('tiny'));}
//export NODE_ENV=production //set environment variable

//configuration
//how to store and override configuration
//install npm i config
//create config folder and default.json file
// {
//     "name": "my-express-app",
//}

//cerate development.json and production.json file
// {
//     "name": "my-express-app-dev",
//     "mail": {
//         "host": "dev-mail-server"}
//}

// const config = require('config');
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
//export NODE_ENV=production //set environment variable
// do not store sensitive information in config file
//use environment variable for that
//export app_password=1234

// create custom-environment-variables.json file
// {
//     "mail": {
//         "password": "app_password"
//     }
// }
// console

//debugger module
//npm i debug
// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
//startupDebugger('Starting up...');
//dbDebugger('Connected to the database...');
//export DEBUG=app:startup //set environment variable
//export DEBUG=app:startup,app:db //set environment variable
//export DEBUG=app:* //set environment variable

//template engine
//npm i pug
// app.set('view engine', 'pug');//internally load pug module
// app.set('views', './views');//default views folder
//CEATE views folder and create index.pug file
//INDEX.PUG
//html
//head
//title= title
//body
//h1= message
//p= content
// app.get('/', (req, res) => {
//     res.render('index', {title: 'My Express App', message: 'Hello'});
// });
