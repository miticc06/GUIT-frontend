import React from 'react'
import * as serviceWorker from './serviceWorker'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from '@graphql'
import App from './App'
import { stores } from '@stores'
import './index.less'

render(
  <ApolloProvider client={client}>
    <Provider stores={stores}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
