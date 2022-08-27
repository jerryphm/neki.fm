import { useState, useEffect } from 'react';
import client from '../../client';
import { useSelector, useDispatch } from 'react-redux';
import { setTop1Song, trendingSelector } from '../../store/trendingSlice';
import { Link } from 'react-router-dom';
import { setIsPlaying, setTrackPosition } from '../../store/playerSlice';
import styled from 'styled-components';
import { VscChevronRight } from 'react-icons/vsc';

function TrendingSong() {
   const { top1Song } = useSelector(trendingSelector);
   const dispatch = useDispatch();
   const handlePlaying = () => {
      dispatch(setIsPlaying(true));
      dispatch(setTrackPosition(0));
   };

   useEffect(() => {
      if (top1Song == null) {
         const getTop1Song = async () => {
            const top1SongRes = await client({
               url: `/?method=chart.gettoptracks&limit=1`,
            });
            const top1Song = top1SongRes.data.tracks.track[0];

            //get album image to use with this song
            const songInfoRes = await client({
               url: `/?method=track.getInfo&artist=${top1Song.artist.name}&track=${top1Song.name}`,
            });
            const image = songInfoRes.data.track.album.image[3]['#text'];
            top1Song.image = image;
            dispatch(setTop1Song(top1Song));
         };
         getTop1Song();
      }
   }, []);
   return (
      <Container>
         <p>What's hot🔥</p>
         <div className='home-trending-title'>
            <h2>Trending</h2>
            <Link to='trend' className='home-trending-title-link'>
               More <VscChevronRight />
            </Link>
         </div>
         <div
            className='home-trending-card'
            style={{
               backgroundImage: `url(${top1Song?.image})`,
            }}
         >
            <div className='home-trending-card__overlay'></div>
            <div>
               <div className='home-trending__info'>
                  <h4>{top1Song ? top1Song.artist.name : 'artist'}</h4>
                  <h1>{top1Song?.name}</h1>
               </div>
               <div className='home-trending-btns'>
                  <button onClick={handlePlaying}>PLAY</button>
                  <button>FOLLOW</button>
               </div>
               <p></p>
            </div>
         </div>
      </Container>
   );
}

export default TrendingSong;
const Container = styled.section`
   & > p {
      color: var(--light-gray-text);
      font-size: 14px;
      margin-bottom: 0.3rem;
   }
   .home-trending-title {
      display: flex;
      justify-content: space-between;
      align-items: end;
      margin-bottom: 0.8rem;
      h2 {
         font-size: var(--font2xl);
      }
      .home-trending-title-link {
         display: flex;
         align-items: center;
         color: var(--light-gray-text);
         font-size: 14px;
      }
   }
   .home-trending-card {
      position: relative;
      min-height: 20rem;
      border-radius: 1rem;
      background-size: cover;
      background-position: center; /// left ?
      background-repeat: no-repeat;
      &__overlay {
         position: absolute;
         inset: 0;
         border-radius: 1rem;
         background-image: linear-gradient(
            80deg,
            var(--white) 20%,
            rgba(255, 255, 255, 0.2)
         );
      }
      div:last-child {
         position: absolute;
         inset: 0;
         display: flex;
         flex-direction: column;
         justify-content: center;
         gap: 2.5rem;
         align-items: start;
         padding: 1.5rem 24px;
         color: var(--black);
         .home-trending__info {
            h4 {
               color: var(--light-gray-text);
               font-size: 15px;
               font-weight: normal;
            }
            h1 {
               font-size: var(--font3xl);
               text-overflow: ellipsis;
               overflow: hidden;
               max-width: 15ch;
            }
         }
         .home-trending-btns {
            display: flex;
            align-items: center;
            gap: 2rem;
            button {
               height: 3.6rem;
               width: fit-content;
               padding: 0 2.4rem;
               border-radius: 5rem;
               border: 2px solid var(--black);
            }
            button:first-child {
               background-color: var(--black);
               color: var(--white);
            }
         }
      }
   }
`;
