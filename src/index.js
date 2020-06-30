import React from 'react'
import ReactDOM from 'react-dom'
import 'focus-visible'
import 'normalize.css'
import * as serviceWorker from './serviceWorker'
import App from './App'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
)

serviceWorker.register()
