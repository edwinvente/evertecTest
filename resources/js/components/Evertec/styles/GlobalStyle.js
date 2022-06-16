// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    font-family: 'Montserrat', sans-serif !important;
    //color: white;
  }
  body {
    //background-color: #242526;
    margin: 0;
    padding: 0;
  }
  .sidebar{
    background: #eaeaea;
    min-height: 100vh;
    max-height: 100%;
    nav{
        ul{
            margin-top: 20px;
            padding: 0 52px;
            list-style: none;
            li{
                margin-bottom: 5px;
                a{
                    color: gray;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 18px;
                }
            }
        }
    }
  }
  .checkout{
    //background: #eaeaea;
  }
`;

export default GlobalStyle;
