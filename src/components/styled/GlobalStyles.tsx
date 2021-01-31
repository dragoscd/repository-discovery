import normalize from 'styled-normalize';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    ${reset}
    ${normalize}

    body {
        font-family: sans-serif;
    }

    h1, h2, h3 {
        font-weight: bold;
    }

    h2 {
        font-size: 20px;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;
