import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Login from "./components/Login"
// import App from './App';
import AppRoutes from "./routes/Routes"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppRoutes/>
);
