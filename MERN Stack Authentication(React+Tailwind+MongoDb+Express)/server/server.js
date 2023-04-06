import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/**********middle ware************/
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // reduce hacker awareness of stack

const port = 8080;

/*****Http Get Request*****/ 
app.get('/', (req,res)=>{
    res.status(201).json("Home GET Request")
})


/***api routes*****/ 
app.use('/api', router);

/***** start server only with valid connection*******/ 

connect().then(()=>{
    try{
        app.listen(port, ()=>{
            console.log(`Server Connected to http://localhost:${port}`);  
        })

    }catch(error){
        console.log("cannot connect to server")  
    }
}).catch(error =>{
     console.log("Invalid db connection");
})

