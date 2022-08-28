import React from 'react';
import { BiNavigation } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ArtistCard({ avatar, name, playcount }) {
   return (
      <Container>
         <div style={{ backgroundImage: `url(${avatar})` }} />
         <div>
            <h4>{name}</h4>
            <p>Playcount: {playcount}</p>
         </div>
         <Link to={`artists/${name}`}>
            <BiNavigation />
         </Link>
      </Container>
   );
}

export default ArtistCard;
const Container = styled.section`
   display: flex;
   height: 4rem;
   gap: 1.5rem;
   margin-bottom: 2rem;
   div:first-child {
      flex-shrink: 0;
      flex-grow: 0;
      height: 3.7rem;
      width: 3.7rem;
      border-radius: 5rem;
      border: 3px solid var(--gray-text);
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
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
      h4 {
         font-size: var(--fontbase);
         font-weight: normal;
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
