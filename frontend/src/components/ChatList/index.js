import React, { useEffect } from "react"
import placeholder from "../../img/placeholder.jpeg"
import "./style.css"


function ChatList({chatList, changeActiveChatId}) {

    // Hook para setar o atributo active como true do primeiro chat da lista
    // que será o chat default a ser mostrado.
    // Futuramente será substituído por um método que obterá a lista de chat
    // através de uma requisação na API 
    useEffect(() => {
        let chatItemList = [...document.querySelectorAll(".chat-list__item")]
        changeActiveChatId(chatItemList[0].id)
        chatItemList[0].setAttribute("active", "true")
    }, [])

    // Método para setar o atributo active do elemento selecionado pelo usuário
    // através de um click como true
    const selectChat = (event) => {
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
            let id = chatList.indexOf(chat)
            return <div 
            className="chat-list__item"
            id = {id} 
            active="false"
            onClick={(e) => selectChat(e.target)} 
            key={chatList.indexOf(chat)}>
                <img className="item--image" src={placeholder} id={id}/> 
                {chat}
            </div>
        })}
    </div>

}
export default ChatList