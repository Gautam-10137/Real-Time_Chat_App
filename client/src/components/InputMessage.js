import React,{useState} from 'react'

const InputMessage = ({socket}) => {
    const [username,setUsername]=useState('');
    const [inputMessage,setInputMessage]=useState('');
 
    const sendMessage=()=>{
        
     if(username && inputMessage){
         const message={
             user:username,
             content:inputMessage
         }
         console.log(message);
         socket.emit('sendMessage',message);
         setInputMessage('');
     }
    };
 
   return (
     <div>
       <input
       type='text'
       placeholder='Username'
       value={username}
       onChange={(e)=>{setUsername(e.target.value)}}
       ></input>
       
       <input
        type='text'
        placeholder='Type your message'
        value={inputMessage}
        onChange={(e)=>{setInputMessage(e.target.value)}}
       >
       </input>
       <button onClick={sendMessage}>Send</button>
     </div>
   )
}

export default InputMessage
