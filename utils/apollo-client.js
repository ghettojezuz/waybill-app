import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';

const GRAPHQL_URL = 'http://localhost:3001';

const link = new HttpLink({
    fetch,
    uri: GRAPHQL_URL
});

export default withApollo(
    ({ initialState }) =>
        new ApolloClient({
            link: link,
            cache: new InMemoryCache()
                .restore(initialState || {})
        })
);