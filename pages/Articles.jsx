import {ArticleTitle,ArticleListContainer} from "../styles/Home.style";
import Link from "next/link";


export default function Articles({articles}){
    return (
        <section>
            {
                articles.map(article => 
                    <Link key={article.id} href={`/blog/${article.id}`}>
                        <a>
                            <ArticleListContainer url={article.image.url}>
                                <ArticleTitle>{article.categorie.nom}</ArticleTitle>
                                <ArticleTitle>{article.titre}</ArticleTitle>
                            </ArticleListContainer>
                        </a>
                    </Link>
                )
            }
        </section>
    )
}

