import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsPlaying, setTrackPosition } from '../store/playerSlice';
import client from '../client';
import { IoVolumeMediumOutline } from 'react-icons/io5';
import styled from 'styled-components';
function Track({ trackName, artistName, id, listeners }) {
   //get info track
   const [infoTrack, setInfoTrack] = useState(null);
   useEffect(() => {
      const getInfoTrack = async () => {
         const res = await client({
            url: `/?method=track.getInfo&artist=${artistName}&track=${trackName}`,
         });
         const infoTrack = res.data.track;
         setInfoTrack(infoTrack);
      };
      getInfoTrack();
   }, []);

   //correct
   const correctPosition = (p) => {
      return p <= 9 ? '0' + p : p;
   };
   const convertDuration = (d) => {
      const minutes = Math.floor(d / 1000 / 60);
      let seconds = (d / 1000) % 60;
      if (seconds <= 9) seconds = '0' + seconds;
      return minutes + ':' + seconds;
   };

   //setPlayState (not togglePlayState)
   const dispatch = useDispatch();
   const setPlayState = (id) => {
      dispatch(setIsPlaying(true));
      dispatch(setTrackPosition(id));
   };

   return (
      infoTrack && (
         <Container onClick={() => setPlayState(id)}>
            <div>
               <span> {correctPosition(id + 1)}</span>
               <IoVolumeMediumOutline />
            </div>
            <div className='track__name ellipsis'>{infoTrack.name}</div>
            <div className='track__artist-name ellipsis'>
               {infoTrack.artist.name}
            </div>
            <div className='track__duration'>
               {convertDuration(infoTrack.duration)}
            </div>
            <div className='track__album ellipsis'>
               {infoTrack.album?.title || 'unknown album'}
            </div>
         </Container>
      )
   );
}

export default Track;
const Container = styled.section`
   display: flex;
   align-items: center;
   gap: 1rem;
   height: 50px;
   padding: 0 1.5rem;
   border-radius: 1rem;
   background-color: var(--white);
   font-size: var(--fontxs);
   color: var(--gray-text);
   cursor: pointer;
   transition: 0.25s linear;
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
      margin-right: 1rem;
      text-align: center;
      svg {
         position: absolute;
         top: 50%;
         left: 0px;
         transform: translate(-1px, -50%);
         opacity: 0;
         font-size: var(--font2xl);
         transition: 0.1s linear;
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

   .track__listeners ellipsis {
   }
`;
