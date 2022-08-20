import styled from 'styled-components';
import apiClient from '../../apiClient';
import { useSelector, useDispatch } from 'react-redux';
import { tagSelector, setTags } from '../../store/tag/tagSlice';
import { useEffect } from 'react';
import gradientColors from '../../assets/gradientColors';
import { Link } from 'react-router-dom';

function Default() {
   const dispatch = useDispatch();
   const { tags } = useSelector(tagSelector);
   if (tags.length == 0) {
      const getTags = async () => {
         const res = await apiClient({
            url: `/?method=tag.getTopTags`,
         });
         const tags = res.data.toptags.tag.slice(0, 25);
         for (let i = 0; i < 25; i++) {
            tags[i] = { ...tags[i], ...gradientColors[i] };
         }
         dispatch(setTags(tags));
      };
      getTags();
   }
   useEffect(() => {
      const tags = document.querySelectorAll('.tag');
      tags.forEach((tag) => {
         tag.onclick = (e) => {
            let x = e.clientX - e.currentTarget.offsetLeft;
            let y = e.clientY - e.currentTarget.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            tag.appendChild(ripples);
         };
      });
   });
   return (
      <Container>
         {tags.map((tag, i) => (
            <Link
               to={'/'}
               style={{ backgroundColor: tag.color }}
               className='tag'
               key={i}
            >
               <p>{tag.name}</p>
            </Link>
         ))}
      </Container>
   );
}

export default Default;

export const Container = styled.section`
   display: flex;
   flex-wrap: wrap;
   gap: 1.2rem;
   & > * {
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
   }
   span {
      position: absolute;
      background-color: #fff;
      transform: translate(-50%, -50%);
      pointer-events: none;
      border-radius: 50%;
      animation: ripples 0.5s ease-out;
   }
   p {
      user-select: none;
      color: white;
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
`;
