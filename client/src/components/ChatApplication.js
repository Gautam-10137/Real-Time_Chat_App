import React,{useEffect,useState} from 'react';
import socketIOClient from 'socket.io-client';
import MessageList from './messageList';
import InputMessage from './InputMessage';

const ENDPOINT=process.env.REACT_APP_ENDPOINT;
const ChatApplication = () => {
    const [messages,setMessages]=useState([]);
    const socket=socketIOClient(ENDPOINT); 
   
    useEffect(()=>{
        // Check if the connection is established       
  socket.on('connect', () => {
    console.log('Connected to Socket.IO');
  });
     socket.on('loadMessages',(loadedMessages)=>{
         setMessages(loadedMessages);
     });
     socket.on('receiveMessage',(newMessage)=>{
      setMessages((prevMessages)=>[...prevMessages,newMessage]);
     })
     // cleaning up while component unmounts
     return ()=>{
         socket.disconnect();
     };
     },[]);
   return (
     <div>
       <h1>Real-time Chat App</h1>
       <MessageList messages={messages}/>
       <InputMessage socket={socket}/>
     </div>
   )
}

export default ChatApplication
