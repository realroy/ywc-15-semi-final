import React from 'react'
import { render } from 'react-router-dom'

import './index.css'
import Router from './Router'
import registerServiceWorker from './registerServiceWorker'

import 'tachyons/css/tachyons.min.css'

render(<Router />, document.getElementById('root'))
registerServiceWorker()
