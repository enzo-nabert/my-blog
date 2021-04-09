import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import {H2} from "../../styles/Home.style";
import {IMG,H1,ArticleContainer,ArticleContent} from "../../styles/Blog.style";
import parse from 'html-react-parser';
import Header from '../Header';

export default function Article({data}){
    return (
        <section>
            <Header />
            {data.allArticles.map(
                article => 
                    <ArticleContainer key={article.id}>
                        <H1>{article.titre}</H1>
                        <IMG src={article.image.url}></IMG>
                        <ArticleContent>{parse(article.contenu)}</ArticleContent>
                    </ArticleContainer>
                )}
        </section>
    )
}

function getClientForQuery(){
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

    return client;
}

export async function getStaticProps({params}){
    let client = getClientForQuery();
    const { data } = await client.query({
        query: gql`
        query {
            allArticles(filter: {id: {eq: ${params.id}}}) {
              id
              titre
              contenu
              image {
                url
              }
            }
          }
        `
    });
    console.log(data)
    return {
        props: { data }
    };
}

export async function getStaticPaths(){

    let client = getClientForQuery()
    
    const { data } = await client.query({
        query: gql`
        query{
            allArticles{
              id
            }
          }
        `
    });
    return {
        paths : data.allArticles.map(
            article => (
                {params : 
                    {id: article.id.toString()}
                }
            )
        ),
        fallback : false
    }
}