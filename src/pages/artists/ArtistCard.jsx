import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function ArtistCard({ artist }) {
   const correct = (listener) => {
      return listener.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };
   const correctName = (name) => {
      return name.toLowerCase().split(' ').join('');
   };
   return (
      <Container style={{ backgroundImage: `url(${artist.avatar})` }}>
         <div className='artist-card__overlay'></div>
         <div className='artist-card__info'>
            <Link to={correctName(artist.name)}>{artist.name}</Link>
            <p>{correct(artist.listeners)} listeners</p>
         </div>
      </Container>
   );
}

export default ArtistCard;
const Container = styled.section`
   position: relative;
   min-height: 15rem;
   width: 22%;
   border-radius: 1rem;
   margin-bottom: 3rem;
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   @media only screen and (max-width: 850px) {
      width: 30%;
   }
   .artist-card__overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.35);
      border-radius: 1rem;
   }
   .artist-card__info {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      color: var(--white);
      cursor: pointer;

      h4 {
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 15ch;
         font-size: var(--font-base);
      }
      p {
         font-size: 13px;
         color: #e9e6e6;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
      }
   }
`;
