import React from 'react';
import styled from 'styled-components';

function SearchNotFound() {
   return (
      <Container>
         <h1>Opps! No results to show</h1>
         <p>Please make sure your words are spelled correctly</p>
      </Container>
   );
}

export default SearchNotFound;

const Container = styled.section`
   height: calc(100vh - 88px);
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   h1 {
      font-size: var(--fontxl);
   }
`;
