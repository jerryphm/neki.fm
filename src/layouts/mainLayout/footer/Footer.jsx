import React from 'react';
import styled from 'styled-components';
import { PlayerControls, PlayerInfo } from './index';

function Footer() {
   return (
      <Container>
         <PlayerControls />
         <PlayerInfo />
      </Container>
   );
}

export default Footer;
const Container = styled.footer`
   position: fixed;
   z-index: 999;
   bottom: 0;
   left: 250px;
   right: 0;
   height: 80px;
   display: flex;
   align-items: start;
   gap: 24px;
   padding: 0 var(--padding-x);
   background-color: var(--outer-bg);
   section {
      transform: translateY(-30px);
      height: 120%;
      background-color: #fff;
   }
   section:first-child {
      width: 70%;
   }
   section:last-child {
      width: 30%;
   }
`;
