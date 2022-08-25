import { Track } from '.';
import styled from 'styled-components';

function Tracks({ tracks, display = 'Top Tracks' }) {
   
   return (
      <Container>
         <h2>{display}</h2>
         {tracks.map((track, i) => (
            <Track
               trackName={track.name}
               artistName={track.artist}
               id={i} // use id to show position, and use for player
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
