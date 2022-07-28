import React, { useEffect, useState } from "react";
import placeholder from "../../img/placeholder.jpeg";
import "./style.css";
import api from "../../services/api";

function ChatList({ changeActiveChatId, userId }) {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    api.getChatList(userId).then((data) => {
      setChatList(data);
    });
  }, []);

  useEffect(() => {
    let chatItemList = [...document.querySelectorAll(".chat-list__item")];
    changeActiveChatId(chatItemList[0]?.id);
    chatItemList[0]?.setAttribute("active", "true");
  }, [chatList]);

  const selectActiveChat = (event) => {
    let chatItemList = [...document.querySelectorAll(".chat-list__item")];
    console.log(event.id);
    chatItemList.map((item) => {
      if (item.id === event.id) {
        changeActiveChatId(item.id);
        return item.setAttribute("active", "true");
      }
      return item.setAttribute("active", "false");
    });
  };

  return (
    <div className="chat-list">
      {chatList?.map((chat) => {
        let date = chat.last_message_at
        let formattedTime = date.split("T")[1].substring(0, 5)
        return (
          <button
            className="chat-list__item"
            id={chat.id}
            active="false"
            onClick={(e) => selectActiveChat(e.target)}
            key={chatList.indexOf(chat)}
          >
            <img
              className="item--image"
              src={placeholder}
              id={chat.contact.id}
            />
            <span>{chat.contact.username}</span>
            <span>{formattedTime}</span>
            <span>{chat.last_message}</span>
          </button>
        );
      })}
    </div>
  );
}
export default ChatList;
