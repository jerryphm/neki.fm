import React from 'react';
import styled from 'styled-components';
import { searchSelector } from '../../store/search/searchSlice';
import { useSelector } from 'react-redux';
import NotFound from './NotFound';
import Default from './Default';

function Search() {
   const { albums, artists, tracks } = useSelector(searchSelector);

   let renderContent;
   if (!albums) {
      renderContent = <Default/>;
   } else if (albums[0]) {
      renderContent = 'search page';
   } else {
      renderContent = <NotFound />;
   }

   return <Container>{renderContent}</Container>;
}

export default Search;
const Container = styled.section`
`;
