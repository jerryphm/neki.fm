import React from 'react';
import styled from 'styled-components';
import { BsPlayFill } from 'react-icons/bs';
import colors from '../assets/colors';
import { Link } from 'react-router-dom';
import { setIsPlaying, setTrackPosition } from '../store/playerSlice';
import { useDispatch } from 'react-redux';

function Banner({ info }) {
   const getColor = () => {
      const random = Math.floor(Math.random() * colors.length);
      return colors[random].color;
   };
   const correct = (listener) => {
      return listener.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };
   const dispatch = useDispatch();
   const handlePlaying = () => {
      dispatch(setIsPlaying(true));
      dispatch(setTrackPosition(0));
   };
   return (
      <Container className='banner' color={getColor()}>
         <h1>{info.name}</h1>
         <div>
            <button onClick={handlePlaying} className='ellipsis'>
               <BsPlayFill />
               PLAY ARTIST
            </button>
            <div className='banner-listeners'>
               <p>Listeners</p>
               <p className='ellipsis'>{correct(info.stats.listeners)}</p>
            </div>
            <div className='banner-playcount'>
               <p>Playcount</p>
               <p className='ellipsis'>{correct(info.stats.playcount)}</p>
            </div>
            <div className='banner-published'>
               <p>Published</p>
               <p className='ellipsis'>{info.bio.published}</p>
            </div>
         </div>
         <div className='banner-tags'>
            Genres:
            {info.tags.tag.map((t, i) => (
               <Link to={`/search/tag/${t.name}`} className='ellipsis'>
                  {t.name}
               </Link>
            ))}
         </div>
      </Container>
   );
}

export default Banner;
const Container = styled.section`
   position: relative;
   width: 100%;
   padding: 1.5rem 2.4rem 3rem;
   border-radius: 1rem;
   background-color: ${(props) => props.color};
   color: var(--white);
   h1 {
      font-size: var(--font4xl);
   }
   & > div {
      display: flex;
      align-items: end;
      gap: 2rem;
      margin-top: 2rem;
      & > button {
         height: 4rem;
         width: fit-content;
         padding: 0 1.5rem;
         border-radius: 1rem;
         background-color: var(--white);
         color: var(--black);
         svg {
            margin-right: 0.5rem;
            min-width: fit-content;
         }
      }
      .banner-listeners,
      .banner-playcount,
      .banner-published {
         p {
            line-height: 1.3;
         }
         p:first-child {
            font-size: 15px;
         }
         p:last-child {
            font-size: 17px;
         }
      }
   }
   .banner-tags {
      a {
         position: relative;
         &::before {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            border-radius: 3px;
            background-color: var(--white);
            opacity: 0;
         }
         &:hover::before {
            opacity: 1;
         }
      }
   }
`;
