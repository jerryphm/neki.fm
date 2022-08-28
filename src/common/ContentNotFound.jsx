import React from 'react';
import styled from 'styled-components';

function ContentNotFound() {
   return (
      <Container>
         <h1>Opps!</h1>
         <p>No results to show, please try again.</p>
      </Container>
   );
}

export default ContentNotFound;

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
