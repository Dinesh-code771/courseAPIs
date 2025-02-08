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

/// mongo db quering documents
//find() //find all documents
//find({}) //find all documents

//find({name: 'John'}) //find documents with name John

//find({name: 'John', age: 30}) //find documents with name John and age 30

//find({name: 'John', age: {$gt: 30}}) //find documents with name John and age greater than 30

//find({name: 'John', age: {$lt: 30}}).limit(2).sort({name: 1}).select({name: 1, age: 1}) //find documents with name John and age less than 30 and limit 2 and sort by name ascending and select only name and age
//findById() //find document by id

//findOne() //find first document

//findOneAndUpdate() //find first document and update

//findOneAndDelete() //find first document and delete

//findByIdAndUpdate() //find document by id and update
//findByIdAndDelete() //find document by id and delete
//findByIdAndRemove() //find document by id and remove
//findByIdAndReplace() //find document by id and replace


// comparison query operators
// $eq: equal to
// $ne: not equal to
// $gt: greater than
// $gte: greater than or equal to
// $lt: less than
// $lte: less than or equal to
// $in: in
// $nin: not in
// $all: all
// $size: size
// $type: type
// $exists: exists
// $regex: regex
// $options: options

//example
//db.posts.find({age: {$gt: 30}}) //find documents with age greater than 30
//db.posts.find({age: {$gte: 30}}) //find documents with age greater than or equal to 30
//db.posts.find({age: {$lt: 30}}) //find documents with age less than 30
//db.posts.find({age: {$lte: 30}}) //find documents with age less than or equal to 30
//db.posts.find({age: {$in: [30, 40]}}) //find documents with age 30 or 40
//db.posts.find({age: {$nin: [30, 40]}}) //find documents with age not 30 or 40
//db.posts.find({age: {$all: [30, 40]}}) //find documents with age 30 and 40
//db.posts.find({age: {$size: 2}}) //find documents with age size 2
//db.posts.find({age: {$type: 'number'}}) //find documents with age type number
//db.posts.find({age: {$exists: true}}) //find documents with age exists
//db.posts.find({age: {$exists: false}}) //find documents with age not exists

//logical query operators
// $and: and
// $or: or
// $not: not

//example
//db.posts.find({$and: [{age: {$gt: 30}}, {age: {$lt: 40}}]}) //find documents with age greater than 30 and less than 40
//db.posts.find({$or: [{age: {$gt: 30}}, {age: {$lt: 40}}]}) //find documents with age greater than 30 or less than 40
//db.posts.find({$not: {age: {$gt: 30}}}) //find documents with age not greater than 3 

//array query operators
// $all: all
// $elemMatch: elemMatch
// $size: size
// $in: in
// $nin: not in

//regular expression query operators
// $regex: regex
// $options: options

//example
//db.posts.find({name: {$regex: 'John'}}) //find documents with name John
//db.posts.find({name: {$regex: 'John', $options: 'i'}}) //find documents with name John and case insensitive

//starts with
//db.posts.find({name: {$regex: '^J'}}) //find documents with name starting with J

//ends with
//db.posts.find({name: {$regex: 'd$'}}) //find documents with name ending with d

//contains
//db.posts.find({name: {$regex: 'o'}}) //find documents with name containing o

//not contains
//db.posts.find({name: {$not: {$regex: 'o'}}}) //find documents with name not containing o


// count
//db.posts.countDocuments() //count all documents
//db.posts.countDocuments({age: {$gt: 30}}) //count documents with age greater than 30

//distinct
//db.posts.distinct('name') //find distinct names


//pagination
//db.posts.find().skip(2).limit(2) //skip 2 documents and limit 2 documents
//db.posts.find().skip(2).limit(2).sort({name: 1}) //skip 2 documents and limit 2 documents and sort by name ascending
//db.posts.find().skip(2).limit(2).sort({name: -1}) //skip 2 documents and limit 2 documents and sort by name descending
//db.posts.find().skip(2).limit(2).sort({name: 1}).select({name: 1, age: 1}) //skip 2 documents and limit 2 documents and sort by name ascending and select only name and age
//const pagenumber = req.query.page || 1;
//const pagesize = 2;
//const skip = (pagenumber - 1) * pagesize;
//db.posts.find().skip(skip).limit(pagesize) //skip 2 documents and limit 2 documents



//update

// async function updatePost(id, updatePost) {
//approacg : query first
//findById
//modify its properties
//save
// const post = await Post.findById(req.params.id);
// if(!post) return res.status(404).send('The post with the given ID was not found.');
// post.name = req.body.name;
// await post.save();
// res.send(post);
// }

// updatePost('66b40254311d2d6162a10775', {name: 'John Doe'});

//approach : update first
//findByIdAndUpdate
//updatePost('66b40254311d2d6162a10775', {name: 'John Doe'});

//approach : update first
//findByIdAndUpdate
//updatePost('66b40254311d2d6162a10775', {name: 'John Doe'});



