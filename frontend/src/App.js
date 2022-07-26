import "./App.css";
import ChatList from "./components/ChatList"
import MessageViewer from "./components/MessageViewer"
import {useState} from "react"

function App() {

  let [activeChatId, setActiveChatId] = useState(null)
  let userId = "15e26fbf-2a2f-4e77-80dd-acbb5cfa6e35"
  
  const changeActiveChatId = (newActiveChatId) => {
    setActiveChatId(newActiveChatId)
  }
  
  
  return (
    <div className="App">
      <header className="header">
        Header
      </header>

      <main>

        <ChatList changeActiveChatId = {changeActiveChatId} userId = {userId}/>
        <MessageViewer activeChatId = {activeChatId} userId = {userId}/>
     
      </main>

      <footer className="footer">
        Footer
      </footer>
    </div>
  );
}

export default App;