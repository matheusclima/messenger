import { useEffect, useState, useContext, useCallback } from "react";
import SocketContext from "../../context/SocketContext";
import placeholder from "../../img/placeholder.jpeg";
import "./style.css";
import api from "../../services/api";
import auth from "../../services/auth";

function ChatList({ activeChatId, changeActiveChatId, userId }) {
  const [chatList, setChatList] = useState([]);
  const messageFromSocket = useContext(SocketContext);

  useEffect(() => {
    if (messageFromSocket) {
      let newChatList = [...chatList];
      let chat = newChatList.find((chat) => chat.id === messageFromSocket.chat_id);
      if (chat) {
        chat.last_message = messageFromSocket.content;
        chat.last_message_at = messageFromSocket.created_at;
        newChatList.sort((a, b) =>
          b.last_message_at.localeCompare(a.last_message_at)
        );
      }
      setChatList(newChatList);
    }
  }, [messageFromSocket]);

  useEffect(() => {
    api.getChatList(userId).then((data) => {
      setChatList(data);
    })
    .catch((e) => {
      alert("Your session has expired")
      auth.logout()
    })
  }, [userId]);

  useEffect(() => {
    let chatItemList = [...document.querySelectorAll(".chat-list__item")];
    chatItemList?.map((item) => {
      if (item.id === activeChatId) {
        changeActiveChatId(item.id);
        return item.setAttribute("active", "true");
      }
      return item.setAttribute("active", "false");
    })
  }, [activeChatId, chatList])


  const drawChatSelector = (chat, index) => {
    let date = chat.last_message_at;
    let formattedTime = date.split("T")[1].substring(0, 5);
    return (
      <button
        className="chat-list__item"
        id={chat.id}
        active="false"
        onClick={(e) => changeActiveChatId(e.target.id)}
        key={index}
      >
        <img className="item--image" src={placeholder} id={chat.id} />
        <div id={chat.id}>
          <span id={chat.id}>{chat.contact.username}</span>
          <span id={chat.id}>{chat.last_message}</span>
        </div>
        <span id={chat.id}>{formattedTime}</span>
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
