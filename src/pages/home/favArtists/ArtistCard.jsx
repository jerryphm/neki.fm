import React from 'react';
import { BiNavigation } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ArtistCard({ avatar, name, playcount }) {
   const correct = (name) => {
      const toLc = name.toLowerCase();
      const rmSpaces = toLc.split(' ').join('');
      return rmSpaces;
   };
   return (
      <Container>
         <div style={{ backgroundImage: `url(${avatar})` }} />
         <div>
            <h4>{name}</h4>
            <p>Playcount: {playcount}</p>
         </div>
         <Link to={`artists/${correct(name)}`}>
            <BiNavigation />
         </Link>
      </Container>
   );
}

export default ArtistCard;
const Container = styled.section`
   display: flex;
   height: 4rem;
   gap: 1rem;
   margin-bottom: 2rem;
   div:first-child {
      flex-shrink: 0;
      flex-grow: 0;
      height: 4rem;
      width: 4rem;
      border-radius: 5rem;
      background-position: center;
      background-size: 120%;
      background-repeat: no-repeat;
   }
   div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2px 0;
      overflow: hidden;
      h4,
      p {
         line-height: 1;
      }
      h4 {
         font-size: var(--fontbase);
         font-weight: normal;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
      p {
         font-size: 14px;
         color: var(--gray-text);
      }
   }
   a {
      display: inline-block;
      margin-left: auto;
      margin-right: 1rem;
      color: var(--light-gray-text);
   }
`;
