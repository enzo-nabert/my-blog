import Head from 'next/head'
import {H2} from "../styles/Home.style"
import Articles from "./Articles"
import Header from './Header'
  
import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export default function Home({data}) {
  return (
    <div>
      <Head>
        <title>My Blog</title>
        <link rel="preconnect" href="https://fonts.gstatic.com/" />
        <link
            href="https://fonts.googleapis.com/css2?family=Questrial&family=Roboto&display=swap"
            rel="stylesheet"
        />
      </Head>
        <main>
        <Header />
        <Articles articles={data.allArticles}/>
      </main>
      
    </div>
  )
}

export async function getStaticProps(){
  const httpLink = createHttpLink({
    uri: `https://graphql.datocms.com/`
  });

  const authLink = setContext((_, { headers }) => {
      return {
          headers: {
              ...headers,
              authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
          }
      };
  });

  const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query{
        allArticles {
          id
          titre
          image {
            url
          }
          categorie {
            nom
          }
        }
      }
    `
  });

  return {
    props: { data }
  };
}