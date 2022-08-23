import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/authSlice';
import MD5 from 'crypto-js/md5';
import client from '../client';
import { IoVolumeMediumOutline } from 'react-icons/io5';
import styled from 'styled-components';
function Track({ trackName, artistName, position }) {
   const { token, secret, sk, api_key } = useSelector(authSelector);

   //get info track
   const [infoTrack, setInfoTrack] = useState(null);
   useMemo(() => {
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

   //request music data for listening
   const handlePlay = async () => {
      const url = 'http://ws.audioscrobbler.com/2.0/';
      const api_sig = MD5(
         `api_key${api_key}artist${infoTrack.artist.name}formatjsonmethodtrack.updateNowPlayingtoken${token + secret}`
      );
      const params = {
         artist: infoTrack.artist.name, //2
         track: infoTrack.track,
         method: 'track.updateNowPlaying',
         api_key, //1
         sk,
         api_sig,
         format: 'json', //3
      };
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
         },
         body: new URLSearchParams(params),
      });
      console.log(res);
   };
   return (
      infoTrack && (
         <Container onClick={handlePlay}>
            <div>
               <span> {correctPosition(position)}</span>
               <IoVolumeMediumOutline />
            </div>
            <div>{infoTrack.name}</div>
            <div>{infoTrack.artist.name}</div>
            <div>{convertDuration(infoTrack.duration)}</div>
            <div>{infoTrack.album?.title}</div>
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
   transform: 0.25s linear;
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
`;
