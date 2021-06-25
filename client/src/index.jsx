import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ContextProvider from './contexts/ContextProvider'

const app = (
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
)
ReactDOM.render(app, document.getElementById('root'))

reportWebVitals()
