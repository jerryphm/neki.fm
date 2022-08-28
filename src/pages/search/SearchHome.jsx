import styled from 'styled-components';
import client from '../../client';
import { useSelector, useDispatch } from 'react-redux';
import { tagSelector, setTags } from '../../store/tagSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsMusicNote } from 'react-icons/bs';

function SearchHome() {
   const dispatch = useDispatch();
   const { tags } = useSelector(tagSelector);
   useEffect(() => {
      if (tags == null) {
         const getTags = async () => {
            const res = await client({
               url: `/?method=tag.getTopTags`,
            });
            const tags = res.data.toptags.tag.slice(0, 25); //'limit' url param not working
            dispatch(setTags(tags));
         };
         getTags();
      }
   }, []);
   //css
   useEffect(() => {
      if (tags) {
         const tags = document.querySelectorAll('.tag');
         let lastRandom;
         const timer = setInterval(() => {
            const random = Math.floor(Math.random() * 25);
            tags[random].classList.add('active');
            tags[lastRandom]?.classList.remove('active');
            lastRandom = random;
         }, 2500);
         return () => {
            clearInterval(timer);
         };
      }
   });
   const correct = (tagName) => {
      let toLc = tagName.toLowerCase();
      let rmHyphensSpace = toLc.split(/ |-/).join('');
      return rmHyphensSpace;
   };

   return (
      <Container>
         <h2>Most popular tags for you</h2>
         {tags?.map((tag, i) => (
            <Link to={`tag/${correct(tag.name)}`} className='tag' key={i}>
               <p className='ellipsis'>{tag.name}</p>
               <BsMusicNote />
            </Link>
         ))}
      </Container>
   );
}

export default SearchHome;

export const Container = styled.section`
   display: flex;
   flex-wrap: wrap;
   gap: 1.2rem;
   h2 {
      width: 100%;
      margin-bottom: 1rem;
      font-size: var(--fontxl);
      flex-shrink: 0;
   }
   & > a {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: fit-content;
      padding: 0 16px;
      border-radius: 1rem;
      cursor: pointer;
      overflow: hidden;
      background-color: #fff;
      p {
         user-select: none;
         text-transform: capitalize;
      }
      svg {
         display: none;
      }
      @keyframes ripples {
         0% {
            width: 0px;
            height: 0px;
         }
         70% {
            width: 50px;
            height: 50px;
         }
         100% {
            width: 60px;
            height: 60px;
            opacity: 0;
         }
      }
   }
   & > a.active {
      background-color: var(--pink);
      p {
         color: var(--white);
      }
      svg {
         display: inline-block;
         color: var(--white);
         animation: laklak 1s ease-in;
      }
      @keyframes laklak {
         20% {
            transform: rotate(25deg);
         }
         40% {
            transform: rotate(-25deg);
         }
         60% {
            transform: rotate(25deg);
         }
         80% {
            transform: rotate(-25deg);
         }
         100% {
            transform: rotate(25deg);
         }
      }
   }
`;
