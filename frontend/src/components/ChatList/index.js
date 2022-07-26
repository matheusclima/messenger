import React, { useEffect, useLayoutEffect, useState } from "react"
import placeholder from "../../img/placeholder.jpeg"
import "./style.css"
import fetchChatList from "../../services/api"


function ChatList({changeActiveChatId, userId}) {
    const [chatList, setChatList] = useState([])
    
    useEffect(() => {
        fetchChatList(userId).then((data) => {
            setChatList(data)
        })
    }, [])
    
    useEffect(() => {
        let chatItemList = [...document.querySelectorAll(".chat-list__item")]
        changeActiveChatId(chatItemList[0]?.id)
        chatItemList[0]?.setAttribute("active", "true")
    }, [chatList])

    // Método para setar o atributo active do elemento selecionado pelo usuário
    // através de um click como true
    const selectActiveChat = (event) => {
        let chatItemList = [...document.querySelectorAll(".chat-list__item")]
        chatItemList.map(item => {
            if(item.id === event.id) {
                changeActiveChatId(item.id)
                return item.setAttribute("active", "true")
            }
                return item.setAttribute("active", "false")
        })
    }
    
    return <div className="chat-list">
        {chatList?.map((chat) => {
            return <div 
            className="chat-list__item"
            id = {chat.id} 
            active="false"
            onClick={(e) => selectActiveChat(e.target)} 
            key={chatList.indexOf(chat)}>
                <img className="item--image" src={placeholder} id={chat.contact.id}/> 
                {chat.contact.username}
            </div>
        })}
    </div>

}
export default ChatList