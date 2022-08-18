import { Outlet } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles.js';
import { useSelector } from 'react-redux';
import { authSelector } from './store/auth/authSlice';
import Connect from './Connect';
import { Sidebar, Header, Footer } from './components';
import styled from 'styled-components';

function App() {
   const { isAuthorized } = useSelector(authSelector);

   return (
      <>
         <GlobalStyles />
         {isAuthorized ? (
            <Container>
               <Sidebar />
               <Header />
               <Footer />
               <main>
                  <Outlet />
               </main>
            </Container>
         ) : (
            <Connect />
         )}
      </>
   );
}

export default App;

const Container = styled.div`
   height: 100vh;
   width: 100vw;
   max-width: 1340px;
   padding: 0 var(--padding-x);
   margin: 0 auto;
   main {
      height: 200vh;
      padding: var(--padding-y) var(--padding-x);
      margin-top: 80px;
      margin-left: 220px;
   }
`;
