import React, { useState } from "react"
import api from "../../services/api"
import auth from "../../services/auth"
import icon from "../../img/login.png"
import "./style.css"

function Login() {

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPwd: ""
    })

    const changeForm = () => {
        
        document.querySelector(".login").reset()
        document.querySelector(".signup").reset()
        setUser({
            username: "",
            password: "",
            confirmPwd: ""
        })
        let selectedForm = document.querySelector("input[type=radio]:checked")
        let formContainer = document.querySelector(".form__container")
        console.log(formContainer)
        if(selectedForm.value == "login") {
            formContainer.style.transform = "translateX(0)"
        } else {
            console.log("signup")
            formContainer.style.transform = "translateX(-50%)"
        }

    }

    const handleFormInfo = (e) => {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))
    }

    const submitLoginInfo = async (event) => {
        event.preventDefault()
        
        let response = await api.sendLogin({
            username: user.username,
            password: user.password
        })
        auth.login(response.token)
    }

    const submitSignUpInfo = async (event) => {
        event.preventDefault()
        let response = await api.sendSignUp({
            username: user.username,
            password: user.password
        })
        alert("Usuário cadastrado com sucesso")
        window.location.reload()
    }


    const togglePasswordVisibility = () => {
        let passwordInput = document.getElementsByName("password")[0]
        passwordInput.type = passwordInput.type === "password" ? "text" : "password"
    }

    return (
        <main className="main">

            <section>
                <label className="radio__btn">
                    <input type="radio" name="form--type" defaultChecked onChange={changeForm} value="login"/>
                    <div>Login</div>
                </label>
                <label className="radio__btn">
                    <input type="radio" name="form--type" onChange={changeForm} value="signup"/>
                    <div>Signup</div>
                </label>
            </section>

            <section>
                <img src={icon} alt="Login icon"></img>
                <h3>Bem-vindo</h3>
                <article>
                    <div className="form__container">
                        <form action="" method="POST" onSubmit={submitLoginInfo} className="form login">
                            <label className="input--field">
                                <input
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    placeholder=" "
                                    onChange={handleFormInfo}
                                ></input>
                                <p>Username</p>
                            </label>

                            <label className="input--field">
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    placeholder=" "
                                    onChange={handleFormInfo}
                                ></input>
                                <p>Password</p>
                                <label className="toggle__password">
                                    <input
                                        type="checkbox"
                                        className="toggle__checkbox"
                                        onClick={togglePasswordVisibility}></input>
                                    <div className="slider"></div>
                                </label>
                            </label>
                            <button type="submit" className="login__button">Login</button>
                        </form>

                        <form action="" method="POST" onSubmit={submitSignUpInfo} className="form signup">
                            <label className="input--field">
                                <input
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    placeholder=" "
                                    onChange={handleFormInfo}
                                ></input>
                                <p>Username</p>
                            </label>

                            <label className="input--field">
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    placeholder=" "
                                    onChange={handleFormInfo}
                                ></input>
                                <p>Password</p>
    
                            </label>

                            <label className="input--field">
                                <input
                                    type="password"
                                    name="confirmPwd"
                                    value={user.confirmPwd}
                                    placeholder=" "
                                    onChange={handleFormInfo}
                                ></input>
                                <p>Confirm Password</p>
                            </label>

                            <button type="submit" className="login__button">Sign Up</button>
                        </form>

                    </div>

                </article>

            </section>
        </main>
    )
}

export default Login