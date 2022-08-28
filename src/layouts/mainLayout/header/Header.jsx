import React from 'react';
import styled from 'styled-components';
import NavButtons from './NavButtons';
import InputSearch from './InputSearch';

function Header() {
   return (
      <Container>
         <section>
            <NavButtons />
            <InputSearch />
         </section>
      </Container>
   );
}

export default Header;

const Container = styled.header`
   position: relative;
   height: 8rem;
   display: flex;
   align-items: center;
   section {
     display: flex;
     align-items: center;
     gap: 2rem;
     input {
       width: 60vw;
     }
   }
`;
