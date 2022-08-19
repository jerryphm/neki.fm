import React from 'react';
import styled from 'styled-components';
import { searchSelector } from '../../store/search/searchSlice';
import { useSelector } from 'react-redux';
import NotFound from './NotFound';

function Search() {
   const { albums, artists, tracks } = useSelector(searchSelector);

   let renderContent;
   if (!albums) {
      renderContent = 'default';
   } else if (albums[0]) {
      renderContent = 'search page';
   } else {
      renderContent = <NotFound />;
   }

   return <Container>{renderContent}</Container>;
}

export default Search;
const Container = styled.section`
   min-height: 100%;
`;
