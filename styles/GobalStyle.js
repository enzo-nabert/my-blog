import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style-type: none;
    }
    
    html { 
        overflow:auto;
        scroll-behavior: smooth;
    }
`;

export default GlobalStyle;