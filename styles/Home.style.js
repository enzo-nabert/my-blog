import styled from "styled-components"

export const H2 = styled.h2`
    color: #000;
    font-size: 20px;
    margin: 15px;
`

export const ArticleListContainer = styled.article.attrs((props) => {})`
    
    height: 250px;
    background-image: url(${(props) => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    padding: 10px;
    position: relative;

    &::before{
        content: " ";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(0,0,0,0.7);
        z-index: 1;
        transition: all .5s linear;
    }

    &:hover{
        &::before{
            background-color: rgba(0,0,0,0);
        }
    }
`

export const ArticleTitle = styled.p`
    font-weight: 400;
    font-size: 20px;
    color: #fff;
    z-index: 2;
    &:first-of-type{
        align-self: flex-end;
        font-size: 15px;
    }
`
