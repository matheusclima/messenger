import React, { useEffect, useState } from "react";
import placeholder from "../../img/placeholder.jpeg";
import "./style.css";
import api from "../../services/api";

function ChatList({ changeActiveChatId, userId }) {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    console.log(`[GET] => Chat list from userId: ${userId}`)
    api.getChatList(userId).then((data) => {
      setChatList(data);
    });
  }, []);

  useEffect(() => {
    console.log("[SET] => Initial chat id to activate")
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

  const drawChatSelector = (chat, index) => {
    let date = chat.last_message_at;
    let formattedTime = date.split("T")[1].substring(0, 5);
    return (
      <button
        className="chat-list__item"
        id={chat.id}
        active="false"
        onClick={(e) => selectActiveChat(e.target)}
        key={index}
      >
        <img className="item--image" src={placeholder} id={chat.contact.id} />
        <div>
          <span>{chat.contact.username}</span>
          <span>{chat.last_message}</span>
        </div>
        <span>{formattedTime}</span>
      </button>
    );
  };

  return (
    <div className="chat-list">
      {chatList?.map((chat, index) => drawChatSelector(chat, index))}
    </div>
  );
}
export default ChatList;
