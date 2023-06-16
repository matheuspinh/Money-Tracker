import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router'
import { ChargesListProvider } from './context/ChargesListContext'
import { PageModeProvider } from './context/PageModeContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChargesListProvider>
    <PageModeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </PageModeProvider>
  </ChargesListProvider>,
)
