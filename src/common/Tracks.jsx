import { Track } from '.';
import styled from 'styled-components';

function Tracks({ tracks }) {
   const getCorrectArtistName = (track) => {
      if (typeof track.artist == 'object') {
         return track.artist.name;
      } else {
         return track.artist;
      }
   };
   return (
      <Container>
         {tracks.map((track, i) => (
            <Track
               trackName={track.name}
               artistName={getCorrectArtistName(track)}
               id={i}
               key={i}
            />
         ))}
      </Container>
   );
}

export default Tracks;
const Container = styled.section``;
