import React from 'react';
import styled from 'styled-components'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';


function NavButtons() {
   return (
      <Container>
         <BsArrowLeftShort />
         <BsArrowRightShort />
      </Container>
   );
}

export default NavButtons;
const Container = styled.section`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 7.5rem;
   & > svg {
      font-size: var(--font3xl);
      color: var(--gray-text);
      cursor: pointer;
   }
`
