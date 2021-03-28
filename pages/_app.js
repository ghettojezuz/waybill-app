import '../styles/reset.css'
import '../styles/globals.css'
import 'fontsource-roboto'
import {Provider} from 'react-redux';
import {useStore} from '../store';
import {ThemeProvider} from '@material-ui/styles';
import {ApolloProvider} from "@apollo/client";
import PleaseSignin from "../components/PleaseSignIn";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import theme from "../theme";
import withApollo from '../utils/apollo-client';

function MyApp({Component, pageProps, apollo}) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <>
            <Head>
                <link rel="icon" type="image/icon" href="/icons/favicon.ico" />
                <title>РОСНЕФТЬ</title>
            </Head>
            <ApolloProvider client={apollo}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <PleaseSignin>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </PleaseSignin>
                    </ThemeProvider>
                </Provider>
            </ApolloProvider>
        </>
    )
}

export default withApollo(MyApp);