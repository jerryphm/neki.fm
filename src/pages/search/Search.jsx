import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

function Search() {
   return (
      <Container>
         <Outlet />
      </Container>
   );
}

export default Search;
const Container = styled.section`
   padding-bottom: 10rem;
`;
