import React, { useState } from "react"
import styles from "./style.module.css"

function Login() {
    console.log("Ola")
    return (
        <>
            <main className={styles.main}>
                <section>
                    <form>
                        <label>
                            <span>Username</span>
                            <input type="text"></input>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password"></input>
                        </label>
                        <button>Login</button>
                        <span>
                            Ainda não é cadastro? Clique <a href="/">aqui</a>
                        </span>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Login