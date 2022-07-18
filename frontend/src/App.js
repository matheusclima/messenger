import "./App.css";
import ChatList from "./components/ChatList"
import {useState} from "react"

function App() {

  let [activeChatId, setActiveChatId] = useState("")
  
  const changeActiveChatId = (newActiveChatId) => {
    setActiveChatId(newActiveChatId)
  }

  let chatList = [
    "Matheus", 
    "Gabriel", 
    "Guilherme", 
    "Bertim",
    "Carlim",
    "Toy",
    "Guto",
    "Carol",
    "Ligia",
    "Bianca",
    "Thais",
    "Paulo"
  ]

  return (
    <div className="App">
      <header className="header">
        Header
      </header>

      <main>

        <ChatList chatList = {chatList} changeActiveChatId = {changeActiveChatId}/>
        
        <div className="chat-list__messages">
          <h1>Conversa {activeChatId}</h1>
        </div>
     
      </main>

      <footer className="footer">
        Footer
      </footer>
    </div>
  );
}

export default App;