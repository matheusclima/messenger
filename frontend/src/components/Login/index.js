import React, { useState, useContext } from "react"
import LoginContext from "../../context/LoginContext"
import api from "../../services/api"
import styles from "./style.module.css"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const setUserId = useContext(LoginContext)

    const submitLoginInfo = async (event) => {
        event.preventDefault()
        let response = await api.sendLogin({username, password})
        localStorage.setItem("token", response.token)
    }

    return (
        <main className={styles.main}>
            <section>
                <form action="" method="POST" onSubmit={submitLoginInfo}>
                    <label className="input--field">
                        <p>Username: </p>
                        <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </label>
                    <label className="input--field">
                        <p>Password: </p>
                        <input 
                        type="password"
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </label>
                    <button type="submit" className={styles.login__button}>Login</button>
                    <p>
                        Ainda não é cadastrado? Clique <a href="/">aqui</a>
                    </p>
                </form>
            </section>

            <section>
            </section>
        </main>
    )
}

export default Login