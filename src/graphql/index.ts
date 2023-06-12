import { ApolloClient, InMemoryCache } from '@apollo/client'
import { baseURL } from '@/utils'

export const apolloClient = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
})
