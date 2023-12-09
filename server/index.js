const express=require('express');
const mongoose=require('mongoose');
const http=require('http')
const socketIO=require('socket.io');
const bodyParser=require('body-parser');
const cors=require('cors');
const {handleSocketConnection}=require('./socketHandlers')
require('dotenv').config();

const app=express();
const server=http.createServer(app);
const io=socketIO(server,{
    cors: {
      origin: 'http://localhost:3000',  // Adjust this to your frontend origin
      methods: ['GET', 'POST'],
    },
  });

const password=process.env.password;
mongoose.connect(`mongodb+srv://pahwagautam47:${password}@cluster0.bw0tvfc.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',err=>{
    console.log('MongoDB connection error '+{err});
})
db.once('open',()=>{
    console.log('Connected to MongoDB');
})
app.use(cors());
app.use(bodyParser.json());

// setting up Socket.IO connection handling
handleSocketConnection(io);



const PORT=process.env.port;
server.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`);
});
