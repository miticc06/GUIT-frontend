import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {}, localToken = localStorage.getItem('token') }) => {
    if (localToken) {
      headers['token'] = localToken
    }
    return {
      headers
    }
  })

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const URN = process.env.REACT_APP_GRAPHQL_URN || `${window.location.host}/${process.env.REACT_APP_END_POINT}`

const httpLink = createUploadLink({
  uri: `${window.location.protocol}//${URN}`
})

const wsLink = new WebSocketLink({
  uri: `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${URN}`,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => ({
      token: window.localStorage.getItem('token') || null
    })
  }
})

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Cache
const cache = new InMemoryCache({
  addTypename: false
})

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, terminatingLink]),
  cache
})

export { default as gql } from 'graphql-tag'
export { client as default, client }
export * from './QMStrings'
