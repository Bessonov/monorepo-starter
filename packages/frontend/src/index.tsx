import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import 'tailwindcss/tailwind.css'

render(<App />, document.getElementById('root'))

module.hot?.accept()
