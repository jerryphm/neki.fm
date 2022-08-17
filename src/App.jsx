import { Outlet } from 'react-router-dom';
import Connect from './Connect';
import { GlobalStyles } from './styles/GlobalStyles.js';
import { useSelector } from 'react-redux';
import { authSelector } from './store/auth/authSlice';
import styled from 'styled-components';

function App() {
   const { isAuthorized } = useSelector(authSelector);
   return (
      <Container>
         <GlobalStyles />
         {isAuthorized ? <Outlet /> : <Connect />}
      </Container>
   );
}

export default App;

const Container = styled.main`
   height: 100vh;
   width: 100vw;
   max-width: 1340px;
   padding: 0 30px;
   margin: 0 auto;
`;
