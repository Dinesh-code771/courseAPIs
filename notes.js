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

//validation at mongoDB
//npm i joi
//create a schema
// const mongoose = require('mongoose');
// const courseSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     author: { type: String, required: true },
//     tags: { type: [String], required: true },
//     isPublished: { type: Boolean, required: true },
//     price: { type: Number, required: true },
//     rating: { type: Number, required: true },
// });

// const course = new Course({
//     name: 'Node.js Course',
//     author: 'John Doe',
//     tags: ['node', 'backend'],
//     isPublished: true,
//     price: 10,
//     rating: 4.5 });

//  await courseSchema.validate();
// console.log(result);

// add callback

// const course = new Course({
//     name: 'Node.js Course',
//     author: 'John Doe',
//     tags: ['node', 'backend'],
//     isPublished: true,
//     price: 10,
//     rating: 4.5 });

// course.save().then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

// course.validate().then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

//we need joi and mongoose

//built in validators
//required
//min
//max
//enum
//match
//validate
//examples
// const courseSchema = new mongoose.Schema({
//     name: { type: String, required: true,minlength: 5,maxlength: 255 },

//     author: { type: String, required: true },
//     tags: { type: [String], required: true },
//     isPublished: { type: Boolean, required: true },
//     price: { type: Number, required: function() {
//         return this.isPublished;
//     } },
//     rating: { type: Number, required: true },
// });

//enum example
// const courseSchema = new mongoose.Schema({
//     category : { type: String, required: true,enum: ['web', 'mobile', 'network'] },
// });

//match example
// const courseSchema = new mongoose.Schema({
//     name: { type: String, required: true,match: /^[a-zA-Z0-9]{3,30}$/ },
// });

//custom validators
// const courseSchema = new mongoose.Schema({
//     name: { type: String, required: true,validate: {
//         validator: function(v) {
//             return v && v.length > 3;
//         },
//     } },
// });

//we can pass empty array to the tag to by pass required validation so that is the reason we are creating
//custom validator
///example for tags array
// const courseSchema = new mongoose.Schema({
//     tags: { type: [String], validate: {
//         validator: function(v) {
//             return v && v.length > 0;
//         },
//         message: 'course should have at least one tag'
//     } },

// async validators
// const courseSchema = new mongoose.Schema({
//     name: { type: String, required: true,validate: {
//isAsync: true,
//         validator: function(v,callback) {
//             setTimeout(() => {
//do some async operation
//                 callback(v && v.length > 3);
//             }, 4000);
//         },
//     } },
// });

//validation errors
//to show multiple errors we need to use array of errors
// async function createCourse() {
//     const course = new Course({
//         name: 'Node.js Course',
//         author: 'John Doe',
//         tags: ['node', 'backend'],
//         isPublished: true,
//     });
//     try {
//         const result = await course.save();
//         console.log(result);
//     } catch (ex) {
//         for(field in ex.errors)  //ex.errors is an object
//             console.log(ex.errors[field].message);
//     }
// }

//schema type object
// const courseSchema = new mongoose.Schema({
//     author: {
//         name: String,
//         bio: String,
//         lowerCase: true,
//              trim:true}

//
//     tags: { type: [String], required: true },
//     date: { type: Date, default: Date.now },
//     isPublished: { type: Boolean, default: false },
//price: { type: Number, required: true,min: 10,max: 200,get: v => Math.round(v), set: v => Math.round(v) },
// });

//mongoose middleware
//pre middleware
//post middleware
//validation middleware
//error middleware

//example
// const courseSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     author: { type: String, required: true },
//     tags: { type: [String], required: true },
//     isPublished: { type: Boolean, required: true },
// });

//pre middleware
//courseSchema.pre('save', function(next) {
//     this.isPublished = true;
//     next();
// });

//post middleware
//courseSchema.post('save', function(doc, next) {
//     console.log('post middleware');
//     next();
// });

//validation middleware
// const courseSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     author: { type: String, required: true },
//     tags: { type: [String], required: true },
//     isPublished: { type: Boolean, required: true },
// });

//validation middleware
//courseSchema.validate();

//error middleware
//courseSchema.validate();

//mongoose relations ( modellin Relationships) here are the methods to create relations
// 1: using references (normalization) ---> consistency
//example

// 2: using embedded documents (denormalization) ---> performance

//hybrid approach

//referencing documents
//const Author = mongoose.model('Author', new mongoose.Schema({
//     name: String,
//     bio: String,
//     lowerCase: true,
//     trim:true}
// }));

//const Course = mongoose.model('Course', new mongoose.Schema({
//     name: String,
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
// }));

//poullation
// async function listcourses() {
//     const courses = await Course.find().populate('author',"name -_id").select('name author');
//     console.log(courses);
//  }
//to oexclude the _id we can use -_id to include the name add properties after ,
//listcourses();
// u get null values for author because we are not populating the author



//embedded documents
// const authorSchema = new mongoose.Schema({
//     name: String,
//     bio: String,
//     lowerCase: true,
//     trim:true}
// });

// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: { type: authorSchema, required: true }
// });

// const course = new Course({
//     name: 'Node.js Course',
//     author: { name: 'John Doe', bio: 'John Doe is a software engineer' }
// });
//update authname
//find course using couse id
//course.author.name = 'Jane Doe';
//await course.save();

//updare subdocument directly
// await course.update({_id:courseId},{$set:{'author.name':'Jane Doe'}});

//unset operation
// await course.update({_id:courseId},{$unset:{'author':''}});


//Array of subdocuments
// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: [authorSchema]

// });
//instead one you pass multiple authers

///you can use push method to add new author
// course.author.push(new Author({name: 'Jane Doe', bio: 'Jane Doe is a software engineer'}));
// await course.save();

//you can use unshift method to add new author
// course.author.unshift({name: 'Jane Doe', bio: 'Jane Doe is a software engineer'});
// await course.save();


//remove operation
//const course = await Course.findById(courseId); 
//const author = course.author.id(authorId)
//author.remove();
//await course.save();



//transaction means a group of operations on the database as a single unit
//if any operation fails, the entire transaction is rolled back
//if all operations succeed, the transaction is committed
//transaction is atomic
//transaction is consistent
//transaction is isolated
//transaction is durable

//install fawn
//npm i fawn


// new Fawn.Task().save("collectionName",rental).update("movies",{_id:rental.movieId},{$inc:{numberInStock:-1}}).run();

//wrap this in try catch block
//try {
//    await new Fawn.Task().save("collectionName",rental).update("movies",{_id:rental.movieId},{$inc:{numberInStock:-1}}).run();
//} catch (error) {
//    console.log(error);b 
//}


//validate objecct id

// function validateObjectId(req,res,next){
//     if(!mongoose.Types.ObjectId.isValid(req.params.id))
//         return res.status(400).send('Invalid ID.');
//     next();
// }

// const Joi = require('joi');
// const mongoose = require('mongoose');
// const JoiObjectId = require('joi-objectid')(Joi);

// const schema = Joi.object({
//     id: JoiObjectId().required()
// });

// const result = schema.validate({ id: '66b40254311d2d6162a10775' });
// console.log(result);

//handling and logging errors
//send error to client
// log the exception


//wrap in try catch block all the code that can throw an error

//moe erros into some centralized error handling middleware

// app.use(function(err,req,res,next){
//     //log exception
//     console.log(err.message);
//     //send to client
//     res.status(500).send('Something failed.');
// });

/// add the above mdlle after all the routes
//in catch use next(err) to pass the error to the middleware

//in catch pass the error to the next middleware
//next(err)

//in the middleware log the error
//console.log(err.message);


//reomve try catch block from the routes


// function asyncMiddleware(handler){
//     return async (req,res,next)=>{
//         try {
//             await handler(req,res);
//         } catch (ex) {
//             next(ex);
//         }
//     }

//router.get('/',asyncMiddleware(async (req,res )=>{
//     const courses = await Course.find();
//     res.send(courses);
// }));

//npm i express-async-errors

//require('express-async-errors');

//use the above in the routes
//router.get('/',async (req,res )=>{
//     const courses = await Course.find();
//     res.send(courses);
// });

