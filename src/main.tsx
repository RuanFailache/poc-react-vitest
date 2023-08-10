import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from "./application/screens/Home";

import './resources/styles/reset.scss'
import './resources/styles/variables.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
