import { useEffect, useState, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {SocketContext } from "../../App"
import api from "../../services/api";
import "./style.css";


function MessageViewer({ activeChatId, userId }) {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext)

  useEffect(() => {
    // console.log(`MessageViewer:`, socket.message)
    if(socket.message)
      socket.message.onmessage = (payload) => {
        let newMessageFromContact = JSON.parse(payload.data)
        if(activeChatId === newMessageFromContact.chat_id)
          setMessageList(prevMessageList => [newMessageFromContact, ...prevMessageList])
      }
  }, [socket])
  // const {sendMessage, lastMessage, readyState} = useWebSocket(`ws://192.168.0.183:8080/users/${userId}/ws`, {
  //   onOpen: () => console.log("[Socket] => Connection opened"),
  //   //Usar isso ou useEffect???
  //   onMessage: (payload) => {
  //     let newMessage = JSON.parse(payload.data) 
  //     if(activeChatId === newMessage.chat_id)
  //       setMessageList(prevMessageList => [newMessage, ...prevMessageList])
  //   },

  //   shouldReconnect: (CloseEvent) => true,
  //   onClose: () => console.log("[Socket] => Connection closed")
  // })

  useEffect(() => {
    // console.log(`[GET] => Chat message from activeChatId: ${activeChatId}`)
    if (activeChatId)
      api.getChatMessages(activeChatId)
      .then((data) => {
        setMessageList(data);
      })
  }, [activeChatId]);

  // Usar ou não useEffect???
  // useEffect(() => {
  //   if(lastMessage){
  //     let newMessage = JSON.parse(lastMessage.data)
  //     if(activeChatId === newMessage.chat_id) 
  //       setMessageList(prevMessageList => [newMessage, ...prevMessageList])
  //   }
  // }, [socket])

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
        content: value,
        chat_id: activeChatId,
        sender_id: userId,
      };
  
      api.postMessage(newMessage)
      .then((savedMessageData) => {
        setMessageList([savedMessageData, ...messageList]);
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
