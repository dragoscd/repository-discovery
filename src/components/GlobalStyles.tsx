import normalize from 'styled-normalize';
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    ${reset}
    ${normalize}
`;

export default GlobalStyles;