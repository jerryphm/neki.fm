import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { tagSelector, setHomeTags } from '../../store/tagSlice';
import { useEffect } from 'react';
import client from '../../client';
import { Link } from 'react-router-dom';

function TopTags() {
   const dispatch = useDispatch();
   const { homeTags } = useSelector(tagSelector);
   useEffect(() => {
      if (homeTags == null) {
         const icons = ['🎵', '🎷', '🎸', '🎹', '🎧'];
         const getHomeTags = async () => {
            const res = await client({
               url: `/?method=tag.getTopTags`,
            });
            const tags = res.data.toptags.tag.slice(0, 5);
            for (let i = 0; i < 5; i++) {
               tags[i].icon = icons[i];
            }
            dispatch(setHomeTags(tags));
         };
         getHomeTags();
      }
   }, []);
   const correct = (tagName) => {
      let toLc = tagName.toLowerCase();
      let rmHyphensSpace = toLc.split(/ |-/).join('');
      return rmHyphensSpace;
   };
   return (
      <Container>
         <h2>Shortcuts</h2>
         <div>
            {homeTags?.map((tag, i) => (
               <Link to={`search/tag/${correct(tag.name)}`} key={i}>
                  {tag.name + ' ' + tag.icon}
               </Link>
            ))}
         </div>
      </Container>
   );
}

export default TopTags;
const Container = styled.section`
   h2 {
      font-size: var(--font2xl);
      margin-bottom: 1rem;
   }

   div {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      a {
         display: inline-block;
         height: 4rem;
         width: fit-content;
         padding: 0 1.5rem;
         border-radius: 5rem;
         color: var(--black);
         background-color: var(--white);
         line-height: 4rem;
         color: var(--gray-text);
      }
   }
`;
