import React from 'react';
import styled from 'styled-components';
import { TrendingSong, TopTags, UserPlaylist, FavorArtists } from './index';

function Home() {
   return (
      <Container>
         <Col>
         	<TrendingSong />
	         <UserPlaylist />
         </Col>
         <Col>
         	<TopTags />
	         <FavorArtists />
         </Col>
      </Container>
   );
}

export default Home;
const Container = styled.section`
   display: flex;
	justify-content: space-between;
	align-items: stretch;
	gap: 5%;
	width: 100%;
	height: calc( 100vh - 18rem);
	overflow: scroll;
	& > div:first-child {
		width: 70%;
	}
	& > div:last-child {
		width: 30%;
	}
`;

const Col = styled.div`
`