import React, { useEffect, useState } from "react";
import "./style.css";

function MessageViewer({ activeChatId }) {
  let chatList = [
    {
      id: 0,
      chat: [
        {
          id: 0,
          text: "Deixando o texto maior que 300px para testar a quebra de linha. asoidaon c asoicnao cneco inadcoaisn as oi cnascoin",
          time: "10:30 AM",
          type: "reciever",
        },
        {
          id: 1,
          text: "Gabriel",
          time: "10:31 AM",
          type: "sender",
        },
        {
          id: 2,
          text: "Gabriel",
          time: "10:31 AM",
          type: "sender",
        },
        {
          id: 3,
          text: "Gabriel",
          time: "10:31 AM",
          type: "sender",
        },
        {
          id: 4,
          text: "Gabriel",
          time: "10:31 AM",
          type: "sender",
        },
        {
          id: 5,
          text: "Deixando o texto maior que 300px para testar a quebra de linha. bla bla bla bla bla blablabl a baldbals",
          time: "10:31 AM",
          type: "sender",
        },
        {
          id: 6,
          text: "Gabriel",
          time: "10:31 AM",
          type: "reciever",
        },
        {
          id: 6,
          text: "Gabriel",
          time: "10:31 AM",
          type: "reciever",
        },
      ],
    },
    {
      id: 1,
      chat: [
        {
          id: 0,
          text: "Chat 2 - Teste",
          time: "10:30 AM",
          type: "reciever",
        },
        {
          id: 1,
          text: "Deu certo",
          time: "10:31 AM",
          type: "sender",
        },
      ],
    },
  ];

  let messageList = chatList.filter((chat) => {
    return chat.id == activeChatId;
  })[0];

  let checkType = ""

  const drawMessage = (message, arrow) => {
    return (
      <div className={`msg msg-${message.type}`} key={message.id}>
        <div className={`ballon msg-${message.type}__ballon`}  arrow={arrow ? "true":"false"}>
          <span>{message.text}</span>
        </div>
      </div>
    );
  };
  
  const sendMessage = (event) => {
    let input = document.getElementsByClassName("text-input")[0];
    let newId = messageList.chat[messageList.chat.length - 1].id + 1;
    if (event.key === "Enter") {
      messageList.chat.push({
        id: newId,
        text: input.value,
        type: "sender",
      });
    }
  };


  return (
    <div className="main-screen">
      <div className="chat-list__messages">
        {messageList?.chat?.map((message) => {
          let arrow = true
          if(checkType === message.type) arrow = false
          checkType = message.type
          return drawMessage(message, arrow)
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
