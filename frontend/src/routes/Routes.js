import React from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import App from "../App"
import Login from "../components/Login"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/app" element={<App />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes