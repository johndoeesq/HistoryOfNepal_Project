//Including the express
const express= require('express');

//Including the dotenv Varibales
const dotenv=require('dotenv');

//Include the logger middleware
const morgan = require('morgan');

//Including the errorHandler middleware
const errorHandler=require('./middleware/errorHandler');

//Connecting the database
const connectDatabase=require('./config/db');

//Including the environment variables
dotenv.config({path:'./config/config.env'});

//Creating the route
const route=require('./routes/route');


//Connecting to the database
connectDatabase();

//Calling the express application
const app=express();

//Body parser
app.use(express.json());

//Using the morgan
app.use(morgan('tiny'));


//mounting the route
app.use('/api/historyofnepal',route);

//Using the errorHandler Middleware
app.use(errorHandler);

//Creating a server to listen to a port
const PORT= process.env.PORT ||5000;
const server=app.listen(
    PORT,()=>console.log(`Server is in ${process.env.NODE_ENV}  mode on  ${PORT}`));


//Handling the unhandled rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`);
    server.close();
})