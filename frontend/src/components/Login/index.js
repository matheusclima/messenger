import React, { useState } from "react"
import api from "../../services/api"
import auth from "../../services/auth"
import icon from "../../img/login.png"
import styles from "./style.module.css"

function Login() {

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const submitLoginInfo = async (event) => {
        event.preventDefault()
        let response = await api.sendLogin({
            username: user.username, 
            password: user.password
        })
        auth.login(response.token)
    }

    const handleLoginInfo = (e) => {
        setUser(prevUser => ({...prevUser, [e.target.name]: e.target.value}))
    }

    return (
        <main className={styles.main}>
            <section>
                <form action="" method="POST" onSubmit={submitLoginInfo}>
                    <img src={icon} alt="Login icon"></img>
                    <h3>Bem-vindo</h3>
                    <label className="input--field">
                        <input
                        type="text"
                        name="username"
                        value={user.username}
                        placeholder=" "
                        onChange={handleLoginInfo}
                        ></input>
                        <p>Username</p>
                        
                    </label>
                    <label className="input--field">
                        <input 
                        type="password"
                        name="password" 
                        value={user.password}
                        placeholder=" "
                        onChange={handleLoginInfo}
                        ></input>
                        <p>Password</p>
                    </label>
                    <button type="submit" className={styles.login__button}>Login</button>
                    <p>
                        Ainda não é cadastrado? Clique <a href="/">aqui</a>
                    </p>
                </form>
            </section>
        </main>
    )
}

export default Login