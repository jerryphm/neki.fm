import { useSelector } from 'react-redux';
import { searchSelector } from '../../../store/search/searchSlice';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Albums, Artists, Tracks } from './index';

function Result() {
   const { resultKeyWord } = useParams();
   const { albums, artists, tracks } = useSelector(searchSelector);

   return (
      <Container>
         <h1>Results for "{resultKeyWord}"🔥</h1> 
         <Artists artists={artists} />
         <Tracks tracks={tracks} />
         <Albums albums={albums} />
      </Container>
   );
}

export default Result;

const Container = styled.section`
   h1 {
      margin-bottom: 1rem;
      color: var(--gray-text);
      font-size: var(--fontbase);
      font-weight: normal;
   }
`;
