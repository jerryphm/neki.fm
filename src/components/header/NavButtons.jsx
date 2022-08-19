import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function NavButtons() {
   const navigate = useNavigate();

   const leftArrowRef = useRef();
   const rightArrowRef = useRef();
   const isLastUrl = window.location.href.includes('token=');
   useEffect(() => {
      if (isLastUrl) {
         leftArrowRef.current.classList.add('reachBottom');
      } else {
         leftArrowRef.current.classList.remove('reachBottom');
      }
   });

   const handleNavigation = (type) => {
      if (type == 'back' && !isLastUrl) {
         navigate(-1);
      } else if (type == 'forward') {
         navigate(1);
      }
   };
   return (
      <Container>
         <div ref={leftArrowRef}>
            <BsArrowLeftShort onClick={() => handleNavigation('back')} />
         </div>
         <div ref={rightArrowRef}>
            <BsArrowRightShort
               onClick={() => handleNavigation('forward')}
            />
         </div>
      </Container>
   );
}

export default NavButtons;
const Container = styled.section`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 7.5rem;
   div {
      display: flex;
      align-items: center;
   }
   div svg {
      font-size: var(--font3xl);
      color: var(--black);
      cursor: pointer;
   }
   div.reachBottom {
      opacity: 0.4;
   }
`;
