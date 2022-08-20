import { createGlobalStyle } from 'styled-components';
import poppinsOtf from '../assets/Poppins-Regular.otf';

export const GlobalStyles = createGlobalStyle`
@font-face {
   font-family: 'Poppins';
   src: url(${poppinsOtf});
}
:root {
   --outer-bg: #e7e8f3;
   --white: #fff;
   --page-color: #f4f5fe;
   --black: #15111e;
   --gray-text: #6a6a6e;
   --light-gray-text: #8f8f8f;
   --pink: #fd8087;
   --red: #fd646f;
   
   --fontsm: 14px;
   --fontbase: 16px;
   --fontlg: 18px;
   --fontxl: 20px;
   --font2xl: 24px;
   --font3xl: 28px;
   --font4xl: 32px;
   --font5xl: 36px;
   --font6xl: 64px;

   --padding-x: 24px;
   --padding-y: 16px;

}
   *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }
   html {
      font-size: 62.5%;
   }
   body {
      font-size: 16px;
      font-family: 'Poppins', sans-serif;
      width: 100vw;
      background-color: var(--outer-bg);
      color: var(--black);
   }
   input, button {
      font-size: 16px;
      font-family: 'Poppins', sans-serif;
      color: var(--black);
   }
   img {
      width: 100%;
      object-fit: cover;
   }
   li {
      list-style-type: none;
   }
   a {
      color: inherit;
      text-decoration: none;
   }
   button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
      cursor: pointer;
   }
`;
