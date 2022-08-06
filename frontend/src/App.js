import "./App.css";
import React, { useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket";
import SocketContext from "./context/SocketContext"
import ChatList from "./components/ChatList"
import MessageViewer from "./components/MessageViewer"
import Routes from "./routes/Routes"
import { BrowserRouter } from "react-router-dom";

function App() {

  const [activeChatId, setActiveChatId] = useState(null)
  const [userId, setUserId] = useState("15e26fbf-2a2f-4e77-80dd-acbb5cfa6e35")
  const [messageFromSocket, setMessageFromSocket] = useState({})

  const socket = useWebSocket(`ws://192.168.0.183:8080/users/${userId}/ws`, {
    onOpen: () => console.log("[Socket] => Connection opened"),
    shouldReconnect: (CloseEvent) => true,
    onMessage: (payload) => {
      let data = JSON.parse(payload.data)
      setMessageFromSocket(data)
    },
    onClose: () => console.log("[Socket] => Connection closed")
  })

  const changeActiveChatId = (newActiveChatId) => {
    setActiveChatId(newActiveChatId)
  }

  const changeUserId = () => {
    let newUserId = userId === "15e26fbf-2a2f-4e77-80dd-acbb5cfa6e35"
      ? "a898e6e7-b1c5-49f5-b72f-60f21206be21"
      : "15e26fbf-2a2f-4e77-80dd-acbb5cfa6e35"
    setUserId(newUserId)
  }

  return (

    <>
      <header className="header">
        Header
      </header>

      <main>
        <SocketContext.Provider value={messageFromSocket}>
          <ChatList 
          userId = {userId}
          activeChatId = {activeChatId} 
          changeActiveChatId = {changeActiveChatId}
          />
          <MessageViewer 
          userId = {userId}
          activeChatId = {activeChatId}
          />
        </SocketContext.Provider>
      </main>

      <footer className="footer">
        Footer
        <button onClick={changeUserId}>Change User</button>
      </footer>
    </>
  );
}

export default App;