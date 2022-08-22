import React from 'react';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { IoVolumeMediumOutline } from 'react-icons/io5';

import apiClient from '../../apiClient';
function Track({ trackName, artistName, position }) {
   const [infoTrack, setInfoTrack] = useState(null);
   useMemo(() => {
      const getInfoTrack = async () => {
         const res = await apiClient({
            url: `/?method=track.getInfo&artist=${artistName}&track=${trackName}`,
         });
         const infoTrack = res.data.track;

         console.log(infoTrack);
         const {
            album,
            artist,
            duration,
            name,
            listeners,
            playcount,
            streamable,
         } = infoTrack;
         setInfoTrack(infoTrack);
      };
      getInfoTrack();
   }, []);
   const correctPosition = (p) => {
      if (p <= 9) {
         return '0' + p;
      }
      return p;
   };
   const convertDuration = (d) => {
      const minutes = Math.floor(d / 1000 / 60);
      let seconds = (d / 1000) % 60;
      if (seconds <= 9) seconds ='0' + seconds
      return minutes + ':' + seconds;
   };
   return (
      infoTrack && (
         <Container>
            <div>
               <span> {correctPosition(position)}</span>
               <IoVolumeMediumOutline />
            </div>
            <div>{infoTrack.name}</div>
            <div>{infoTrack.artist.name}</div>
            <div>{convertDuration(infoTrack.duration)}</div>
            <div>{infoTrack.album.title}</div>
         </Container>
      )
   );
}

export default Track;
const Container = styled.section`
   display: flex;
   align-items: center;
   height: 50px;
   padding: 0 1.5rem;
   border-radius: 1rem;
   background-color: var(--white);
   font-size: var(--fontxs);
   color: var(--gray-text);
   cursor: pointer;
   transform: .25s linear;
   &:not(first-child) {
      margin-top: 1rem;
   }
   &:hover {
      color: var(--black);
      div:first-child {
         svg {
            opacity: 1;
         }
         span {
            opacity: 0;
         }
      }
   }
   div:first-child {
      position: relative;
      width: 3rem;
      padding-right: 1.5rem;
      margin-right: 2rem;
      text-align: center;
      svg {
         position: absolute;
         top: 50%;
         left: 0px;
         transform: translate(-1px, -50%);
         opacity: 0;
         font-size: var(--font2xl);
         transition: .1s linear;
      }
   }
   div:nth-child(4) {
      width: 4rem;
      text-align: right;
      padding: 0 1.5rem;
      margin-right: 4rem;
   }
   div:nth-child(2) {
      width: 35%;
   }
   div:nth-child(3) {
      width: 17%;
   }
   div:nth-child(5) {
      width: 20%;
   }
`;
