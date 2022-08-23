import React from 'react';
import styled from 'styled-components';
import { PlayerControls, PlayerInfo } from './index';

function Footer() {
   return (
      <Container>
         <div className='footer__push'>
            <PlayerControls />
            <PlayerInfo />
         </div>
      </Container>
   );
}

export default Footer;
const Container = styled.footer`
   position: absolute;
   bottom: 0;
   right: var(--padding-x);
   left: var(--padding-x);
   background-color: var(--outer-bg);
   .footer__push {
      display: flex;
      justify-content: space-between;
      height: var(--header-height);
      background-color: var(--white);
      transform: translateY(-1rem);
      border-radius: 1rem;
   }

   section {
      padding: 1rem 1.7rem;
   }
   section:first-child {
      width: 65%;
   }
   section:last-child {
      width: 30%;
   }
`;
