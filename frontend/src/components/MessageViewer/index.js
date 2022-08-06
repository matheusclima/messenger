import { useEffect, useState, useContext } from "react";
import SocketContext from "../../context/SocketContext"
import api from "../../services/api";
import "./style.css";


function MessageViewer({ activeChatId, userId }) {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageFromSocket = useContext(SocketContext)

  useEffect(() => {
    if(messageFromSocket){
      if(activeChatId === messageFromSocket.chat_id)
        setMessageList(prevMessageList => [messageFromSocket, ...prevMessageList])
      }
  }, [messageFromSocket])
  
  useEffect(() => {
    if (activeChatId)
      api.getChatMessages(activeChatId)
      .then((data) => {
        setMessageList(data);
      })
  }, [activeChatId]);

  const drawMessage = (message, type, arrow) => {
    let date = message.created_at;
    let formattedTime = date.split("T")[1].substring(0, 5);
    return (
      <li className={`msg msg-${type}`} key={message.id}>
        <div
          className={`ballon msg-${type}__ballon`}
          arrow={arrow ? "true" : "false"}
        >
          <span className="content">{message.content}</span>
          <span className="time">{formattedTime}</span>
        </div>
      </li>
    );
  };

  const submitMessage = (event) => {
    event.preventDefault();

    if (value.trim()) {
      let newMessage = {
        content: value.trim(),
        chat_id: activeChatId,
        sender_id: userId,
      };
  
      api.postMessage(newMessage)
      .then(() => {
        setValue("");
      });
    }
  };

  const checkIfSender = (message, userId) => {
    if (message.sender_id === userId) return true;
    return false;
  };

  const checkIfDrawArrow = (message, nextMessage) => {
    if (!nextMessage) return true;
    if (message.sender_id !== nextMessage.sender_id) return true;
    return false;
  };

  return (
    <div className="main-screen">
      <ul className="chat-list__messages">
        {messageList?.map((message, index) => {
          let nextMessage = messageList?.[index + 1];
          let messageType = checkIfSender(message, userId) ? "sender" : "reciever";
          let drawArrow = checkIfDrawArrow(message, nextMessage);
          return drawMessage(message, messageType, drawArrow);
        })}
      </ul>

      <form className="input" onSubmit={submitMessage}>
        <input
          type="text"
          className="text-input"
          placeholder="Text your message..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default MessageViewer;
