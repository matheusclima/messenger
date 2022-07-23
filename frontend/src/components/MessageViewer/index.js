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
        }
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

  const sendMessage = (event) => {
    let input = document.getElementsByClassName("text-input")[0]
    let newId = messageList.chat[messageList.chat.length - 1].id + 1
    if(event.key === "Enter") {
      messageList.chat.push({
        id: newId,
        text: input.nodeValue,
        type: "sender"
      })
    }
  }

  return (
    <div className="main-screen">

      <div className="chat-list__messages">
        {messageList?.chat?.map((msg) => {
          if (msg.type == "sender")
            return (
              <div className="msg msg-sender" key={msg.id}>
                <div className="ballon msg-sender__ballon">
                  <span>{msg.text}</span>
                </div>
              </div>
            );
          return (
            <div className="msg msg-reciever">
              <div className="ballon msg-reciever__ballon" key={msg.id}>
                <span>{msg.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="input">
        <input type="text" 
        className="text-input"
        placeholder="Text your message..." 
        onKeyDown={(e) => {sendMessage(e)}}/>
      </div>

    </div>
  );
}

export default MessageViewer;
