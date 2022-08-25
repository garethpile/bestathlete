import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

const client = new ApolloClient({
    headers : {
        "API-ID": "i3r7qpfutrc5jhickziybbcmgm",
        "API KEY": "da2-furlftqpy5anpb475cwlsqaakq",
    },
    uri: 'https://dhy5zxj44zbzfdh6pc72ou7gty.appsync-api.eu-west-1.amazonaws.com/graphql',
    cache: new InMemoryCache()
});


export default client