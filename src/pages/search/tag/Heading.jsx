import React, { useState } from 'react';

import styled from 'styled-components';

function Heading({ intro }) {
   let { content } = intro.wiki;
   content = content.slice(0, content.indexOf('<a'));
   const [isSummary, setSummary] = useState(true);
   return (
      <Container>
         <h1>
            <span>{intro.name}</span> music
         </h1>
         {content ? (
            <>
               <p className={isSummary && 'truncation'}>{content}</p>
               <button onClick={() => setSummary(!isSummary)}>
                  {isSummary ? 'Show more' : 'Show less'}
               </button>
            </>
         ) : null}
      </Container>
   );
}

export default Heading;

const Container = styled.div`
   h1 {
      margin-bottom: 2rem;
      font-size: var(--font4xl);
      span {
         text-transform: capitalize;
      }
   }
   p {
      font-size: var(--fontpsm);
      user-select: text;
      &.truncation {
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 3;
         -webkit-box-orient: vertical;
      }
   }
   button {
      font-size: var(--fontpsm);
   }
`;
