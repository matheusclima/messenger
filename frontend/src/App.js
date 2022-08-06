import "./App.css";
import React, { useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket";
import ChatList from "./components/ChatList"
import MessageViewer from "./components/MessageViewer"

export const SocketContext = React.createContext()

function App() {
  
  const [activeChatId, setActiveChatId] = useState(null)
  const [userId, setUserId] = useState("15e26fbf-2a2f-4e77-80dd-acbb5cfa6e35")
  const [socketData, setSocketData] = useState({})
  
  const socket = useWebSocket(`ws://192.168.0.183:8080/users/${userId}/ws`, {
    onOpen: () => console.log("[Socket] => Connection opened"),
    shouldReconnect: (CloseEvent) => true,
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
        <SocketContext.Provider value={socket}>
          <ChatList changeActiveChatId = {changeActiveChatId} userId = {userId}/>
          <MessageViewer activeChatId = {activeChatId} userId = {userId}/>
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