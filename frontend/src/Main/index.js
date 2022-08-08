import React from "react"
import ChatList from "../components/ChatList"
import MessageViewer from "../components/MessageViewer"
import styles from "./style.module.css"

function Main({userId, activeChatId, changeActiveChatId}) {

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                Header
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
    )
}

export default Main