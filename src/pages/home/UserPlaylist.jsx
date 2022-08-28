import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { authSelector } from '../../store/authSlice';
import { lovedSongSelector, setLovedSongs } from '../../store/lovedSongSlice';
import styled from 'styled-components';
import client from '../../client';
import { Tracks } from '../../common';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useState } from 'react';

function UserPlaylist() {
   const { lovedSongs } = useSelector(lovedSongSelector);
   const { userInfo } = useSelector(authSelector);
   const [isShowMore, setShowMore] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
      if (lovedSongs == null && userInfo) {
         const getUserLovedSongs = async () => {
            const lovedSongRes = await client({
               url: `/?method=user.getlovedtracks&user=${userInfo.name}&limit=15`,
            });
            const songs = lovedSongRes.data.lovedtracks.track;
            dispatch(setLovedSongs(songs));
         };
         getUserLovedSongs();
      }
   }, [lovedSongs, userInfo]);
   let renderedLovedSongs = isShowMore ? lovedSongs : lovedSongs?.slice(0, 5);
   return (
      <Container>
         <div className='home-playlist-title'>
            <h2>My Playlist</h2>
            <button onClick={() => setShowMore(!isShowMore)}>
               {isShowMore ? 'Show Less' : 'Show More'}
            </button>
         </div>
         <div className='home-playlist-tracks'>
            <div className='home-playlist-tracks__heading'>
               <span>#</span>
               <span>TITLE</span>
               <span>ARTIST</span>
               <span>
                  <AiOutlineClockCircle />
               </span>
               <span>ALBUM</span>
            </div>
            {renderedLovedSongs && <Tracks tracks={renderedLovedSongs} />}
         </div>
      </Container>
   );
}

export default UserPlaylist;
const Container = styled.section`
   margin-top: 3rem;
   .home-playlist-title {
      display: flex;
      justify-content: space-between;
      align-items: end;
      h2 {
         font-size: var(--font2xl);
      }
      button {
         font-size: 13px;
         color: var(--light-gray-text);
      }
   }
   .home-playlist-tracks {
      margin-top: 2rem;
      &__heading {
         display: flex;
         align-items: center;
         gap: 1rem;
         height: 50px;
         padding: 0 1.5rem;
         border-radius: 1rem;
         background-color: var(--white);
         color: var(--light-gray-text);
         transition: 0.25s linear;

         span:first-child {
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
         span:nth-child(4) {
            display: flex;
            align-items: center;
            justify-content: end;
            width: 4rem;
            text-align: right;
            margin-right: 4rem;
         }
         span:nth-child(2) {
            width: 35%;
         }
         span:nth-child(3) {
            width: 17%;
         }
         span:nth-child(5) {
            width: 20%;
         }
      }
   }
`;
