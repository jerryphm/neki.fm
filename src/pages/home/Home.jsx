import React from 'react';
import styled from 'styled-components';
import { TrendingSong, TopTags, UserPlaylist, FavArtists } from './index';

function Home() {
   return (
      <Container>
         <Col>
         	<TrendingSong />
	         <UserPlaylist />
				<span className='more-space'></span>
         </Col>
         <Col>
         	<TopTags />
	         <FavArtists />
         </Col>
      </Container>
   );
}

export default Home;
const Container = styled.section`
   display: flex;
	justify-content: space-between;
	align-items: stretch;
	gap: 4%;
	width: 100%;
	height: calc( 100vh - 18rem);
	overflow: scroll;
	& > div:first-child {
		width: 67%;
		flex-shrink: 0;
		flex-grow: 0;
	}
	& > div:last-child {
		width: 29%;
		flex-shrink: 0;
		flex-grow: 0;
	}
	.more-space {
		display: inline-block;
		height: 3rem;
	}
`;

const Col = styled.div`
`