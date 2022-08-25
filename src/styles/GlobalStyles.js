import { createGlobalStyle } from 'styled-components';
import poppinsOtf from '../assets/Poppins-Regular.otf';

export const GlobalStyles = createGlobalStyle`
@font-face {
   font-family: 'Poppins';
   src: url(${poppinsOtf});
}
:root {
   --outer-bg: #e7e8f3;
   --outer-bg-rbga: 231, 232, 243;
   --white: #fff;
   --page-color: #f4f5fe;
   --black: #15111e;
   --gray-text: #585858;
   --light-gray-text: #8f8f8f;
   --pink: #fd8087;
   --red: #fd646f;
   --fontsm: 14px;
   --fontpsm: 15px;
   --fontbase: 16px;
   --fontlg: 18px;
   --fontxl: 20px;
   --font2xl: 24px;
   --font3xl: 28px;
   --font4xl: 32px;
   --font5xl: 36px;
   --font6xl: 64px;
   --padding-x: 24px;
   --padding-y: 20px;

   --header-height: 80px;
   --footer-height: 100px;

}
   *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }
   html {
      font-size: 62.5%;
      height: 100vh;
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
   /* css input track and thumb */
   input {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
   }
   input::-webkit-slider-runnable-track {
      background: var(--black);
      height: 0.4rem;
      border-radius: 5px;
   }
   input::-moz-range-track {
      background: var(--black);
      height: 0.4rem;
      border-radius: 5px;
   }
   input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      margin-top: -2px;
      height: 0.8rem;
      width: 0.8rem;
      border: 2px solid var(--black);
      border-radius: 1rem;
      background-color: var(--white);
      background-clip: content-box;
   }
   input::-moz-range-thumb {
      border: none; /*Removes extra border that FF applies*/
      border-radius: 0; /*Removes default border-radius that FF applies*/
      background-color: var(--white);
      height: 0.5rem;
      width: 0.5rem;
      border: 2px solid var(--black);
      border-radius: 1rem;
   }
   input:focus {
      outline: none;
   }
`;
