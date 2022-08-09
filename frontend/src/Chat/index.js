import React, { useState } from "react"
import useWebSocket from "react-use-websocket";
import SocketContext from "../context/SocketContext"
import ChatList from "../components/ChatList"
import MessageViewer from "../components/MessageViewer"
import styles from "./style.module.css"
import auth from "../services/auth";

function Chat({ userId }) {
    const [activeChatId, setActiveChatId] = useState(null)
    const [messageFromSocket, setMessageFromSocket] = useState({})

    const changeActiveChatId = (newActiveChatId) => {
        setActiveChatId(newActiveChatId)
    }

    const socket = useWebSocket(`ws://192.168.0.183:8080/users/${userId}/ws`, {
        onOpen: () => console.log("[Socket] => Connection opened"),
        shouldReconnect: (CloseEvent) => true,
        onMessage: (payload) => {
            let data = JSON.parse(payload.data)
            setMessageFromSocket(data)
        },
        onClose: () => console.log("[Socket] => Connection closed")
    })

    return (
        <SocketContext.Provider value={messageFromSocket}>
            <div className={styles.app}>
                <header className={styles.header}>
                    <button onClick={()=> {auth.logout()}}>Logout</button>
                </header>

                <main className={styles.main}>
                    <ChatList
                        userId={userId}
                        activeChatId={activeChatId}
                        changeActiveChatId={changeActiveChatId}
                    />
                    <MessageViewer
                        userId={userId}
                        activeChatId={activeChatId}
                    />
                </main>

                <footer className={styles.footer}>
                    Footer
                </footer>
            </div>
        </SocketContext.Provider>
    )
}

export default Chat