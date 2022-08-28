import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Artists({ artists }) {
   return (
      <Container>
         <h2>Top Artists</h2>
         <div className='artist__marquee'>
            {artists.map((artist, i) => (
               <Link to={`/artists/${artist.name}`} key={i}>
                  <span>{artist.name}</span>
               </Link>
            ))}
         </div>
      </Container>
   );
}

export default Artists;
const Container = styled.section`
   overflow: hidden;
   --offset: 0vw;
   --move-initial: calc(-25% + var(--offset));
   --move-final: calc(-50% + var(--offset));
   h2 {
      margin-top: 1rem;
      font-size: var(--fontxl);
   }
   .artist__marquee {
      display: flex;
      align-items: center;
      gap: 1rem;
      height: 80px;
      width: fit-content;
      transform: translate(var(--move-initial));
      animation: marquee 45s 1s linear infinite;
      a {
         display: flex;
         align-items: center;
         justify-content: center;
         height: 55px;
         width: fit-content;
         padding: 0 16px;
         border-radius: 1rem;
         background-color: var(--white);
         color: var(--black);
         white-space: nowrap;
      }
   }
   @keyframes marquee {
      0% {
         transform: translate(var(--move-initial));
      }
      100% {
         transform: translate(var(--move-final));
      }
   }
`;
