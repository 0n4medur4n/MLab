import { createGlobalStyle } from "styled-components";
import "./fonts.css";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.colors.background};
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.body};
  }

  h1, h2 {
    font-family: 'Anurati', 'Garet', sans-serif;
    font-weight: normal;
  }

  h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }

  p {
    font-family: 'Poppins', sans-serif;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyles;
