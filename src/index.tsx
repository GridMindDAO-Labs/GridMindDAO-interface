import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.less'
import './utils/i18n'
import App from './App'
import store from './store'
import reportWebVitals from './reportWebVitals'
// HashRouter BrowserRouter
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from './theme'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './graphql'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <HashRouter>
    <Provider store={store}>
      <ThemeProvider>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  </HashRouter>,
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
