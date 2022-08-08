import React, { useMemo } from "react"
import jwt_decode from "jwt-decode"
import Login from "./components/Login"
import Chat from "./Chat"

function App() {

  let token = localStorage.getItem("token")

  const userId = useMemo(() => {
    if (token) {
      let decodedToken = jwt_decode(token)
      return decodedToken.id
    }
    return ""
  }, [token])

  if (token)
    return (
      <Chat userId={userId}/>
    );
  return (
    <Login />
  )

}

export default App;