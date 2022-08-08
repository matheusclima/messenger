import React, { useMemo, useState } from "react"
import useWebSocket from "react-use-websocket";
import jwt_decode from "jwt-decode"
import LoginContext from "./context/LoginContext";
import SocketContext from "./context/SocketContext"
import Login from "./components/Login"
import Main from "./Main"

function App() {

  // const [userId, setUserId] = useState("")
  const [activeChatId, setActiveChatId] = useState(null)
  const [messageFromSocket, setMessageFromSocket] = useState({})
  let token = localStorage.getItem("token")

  const userId = useMemo(() => {
    if(token) {
      let decodedToken = jwt_decode(token)
      return decodedToken.id
    }
    return ""
  }, [token])

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
  if(token)
    return (
        <SocketContext.Provider value={messageFromSocket}>
          <Main
            userId={userId}
            activeChatId={activeChatId}
            changeActiveChatId={changeActiveChatId}
          />
        </SocketContext.Provider>
    );
  return (
    <LoginContext.Provider>
      <Login/>
    </LoginContext.Provider>
  )
  
}

export default App;