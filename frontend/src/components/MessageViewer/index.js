import React, { useEffect, useState } from "react";
import fetchChatMessages from "../../services/messages"
import saveMessage from "../../services/postMsg"
import "./style.css";

function MessageViewer({ activeChatId, userId }) {

  const [messageList, setMessageList] = useState([])
  
  useEffect(() => {
    if(activeChatId) 
      fetchChatMessages(activeChatId).then(data => {
        setMessageList(data)
      })
    
  }, [activeChatId])

  let messageBlockType = ""

  const drawMessage = (message, type, arrow) => {
    return (
      <div className={`msg msg-${type}`} key={message.id}>
        <div className={`ballon msg-${type}__ballon`}  arrow={arrow ? "true":"false"}>
          <span>{message.content}</span>
        </div>
      </div>
    );
  };
  
  const sendMessage = (event) => {
    let input = document.getElementsByClassName("text-input")[0];
    if (event.key === "Enter") {
      let message = {
        content: input.value,
        chat_id: activeChatId,
        sender_id: userId
      }
      setMessageList([message, ...messageList])
      saveMessage(message)
      input.value = ""
    }
  };

  return (
    <div className="main-screen">
      <div className="chat-list__messages">
        {messageList?.map((message, index) => {
          // Refatorar
          let messageType = "reciever"
          let nextMessage = messageList?.[index + 1]
          let drawArrow = false
          if(userId === message.sender_id) messageType = "sender"
          if( !nextMessage || message.sender_id !== nextMessage.sender_id) drawArrow = true
          return drawMessage(message, messageType, drawArrow)
        })}
      </div>

      <div className="input">
        <input
          type="text"
          className="text-input"
          placeholder="Text your message..."
          onKeyDown={(e) => {
            sendMessage(e);
          }}
        />
      </div>
    </div>
  );
}

export default MessageViewer;
