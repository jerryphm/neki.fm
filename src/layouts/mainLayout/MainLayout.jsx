import { Outlet } from 'react-router-dom';
import { Sidebar, Header, Footer } from './index';
import styled from 'styled-components';

function MainLayout() {
   return (
      <Container>
         <Sidebar />
         <section className='right-side-cmp'>
            <Header />
            <section className='content'>
               <Outlet />
            </section>
            <Footer />
         </section>
      </Container>
   );
}

export default MainLayout;

const Container = styled.section`
   display: flex;
   height: 100vh;
   max-width: 1340px;
   section.right-side-cmp {
      flex-grow: 1;
   }
`;
