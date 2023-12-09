import React from 'react'

const messageList = ({messages}) => {
  return (
    <div>
        {messages.map((message,index)=>(
            <div key={index}>
               <strong>{message.user}:</strong>{message.content}
            </div>
        ))}
      
    </div>
  )
}

export default messageList;
