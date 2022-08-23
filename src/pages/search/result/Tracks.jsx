import React from 'react';
import { Track } from '../../../common';
import styled from 'styled-components';


function Tracks({ tracks }) {
   return (
      <Container>
         <h2>Top Tracks</h2>
         {tracks.map((track, i) => (
            <Track
               trackName={track.name}
               artistName={track.artist}
               position={i + 1}
               key={i}
            />
         ))}
      </Container>
   );
}

export default Tracks;
const Container = styled.section`
   h2 {
      margin-top: 3rem;
      margin-bottom: 2rem;
      font-size: var(--fontxl);
   }
`;
