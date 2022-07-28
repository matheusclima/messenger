import React, { useEffect, useState } from "react";
import api from "../../services/api"
import "./style.css";

function MessageViewer({ activeChatId, userId }) {

  const [value, setValue] = useState("")
  const [messageList, setMessageList] = useState([])
  
  useEffect(() => { 
    if(activeChatId)
      api.getChatMessages(activeChatId).then(data => {
        setMessageList(data)
      })
      console.log(messageList)
  }, [activeChatId])

  const drawMessage = (message, type, arrow) => {
    let date = message.created_at
    let formattedTime = date.split("T")[1].substring(0, 5)
    return (
      <div className={`msg msg-${type}`} key={message.id}>
        <div className={`ballon msg-${type}__ballon`}  arrow={arrow ? "true":"false"}>
          <span className="content">{message.content}</span>
          <span className="time">{formattedTime}</span>
        </div>
      </div>
    );
  };
  
  const sendMessage = (event) => {
    event.preventDefault()

    if( value === "") return
  
    let newMessage = {
      content: value,
      chat_id: activeChatId,
      sender_id: userId
    }

    api.postMessage(newMessage).then(savedMessageData => {
      console.log(savedMessageData)
      setMessageList([savedMessageData, ...messageList])
      document.querySelector(".text-input").value = ""
      setValue("")
    })

  };

  const checkIfSender = (message, userId) => {
    if(message.sender_id === userId) return true
    return false
  } 

  const checkIfDrawArrow = (message, nextMessage) => {
    if( !nextMessage ) return true
    if( message.sender_id !== nextMessage.sender_id ) return true
    return false
  }

  return (
    <div className="main-screen">
      <div className="chat-list__messages">
        {messageList?.map((message, index) => {
          let nextMessage = messageList?.[index + 1]
          let messageType = checkIfSender(message, userId) ? "sender" : "reciever"
          let drawArrow = checkIfDrawArrow(message, nextMessage)
          return drawMessage(message, messageType, drawArrow)
        })}
      </div>

      <form className="input" onSubmit={sendMessage}>
        <input
          type="text"
          className="text-input"
          placeholder="Text your message..."
          onChange={(e) => {
            setValue(e.target.value);
            console.log(value)
          }}
        />
      </form>
    </div>
  );
}

export default MessageViewer;
