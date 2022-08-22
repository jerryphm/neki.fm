import React from 'react';
import styled from 'styled-components';

function Artists({ artists }) {
   return (
      <Container>
         <h2>Top Artists</h2>
         <div>
            {artists.map((artist, i) => (
               <a href='#' key={i}>
                  <span>{artist.name}</span>
               </a>
            ))}
         </div>
      </Container>
   );
}

export default Artists;
const Container = styled.section`
   position: relative;
   overflow: hidden;
   --offset: 0vw;
   --move-initial: calc(-25% + var(--offset));
   --move-final: calc(-50% + var(--offset));
   h2 {
      margin-top: 1rem;
      font-size: var(--fontxl);
   }
   div {
      width: fit-content;
      position: relative;
      transform: translate3d(var(--move-initial), 0, 0);
      animation: marquee 45s 1s linear infinite;
   }
   @keyframes marquee {
      0% {
         transform: translate3d(var(--move-initial), 0, 0);
      }
      100% {
         transform: translate3d(var(--move-final), 0, 0);
      }
   }
   div {
      display: flex;
      align-items: center;
      gap: 1rem;
      height: 80px;
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
`;
