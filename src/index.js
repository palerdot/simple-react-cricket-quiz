import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// include bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
