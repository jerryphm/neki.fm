import React, { useEffect, useState } from 'react';
import client from '../../client';
import ArtistCard from './ArtistCard';
import styled from 'styled-components';

function SimilarsArtists({ similars }) {
   const [similarArtists, setSimilarArtists] = useState(null);
   useEffect(() => {
      const getArtistInfo = (type, artistName) =>
         client({
            url: `/?method=artist.get${type}&artist=${artistName}&limit=1`,
         });
      const artistInfoPromiseArr = [];
      for (let i = 0; i < similars.length; i++) {
         artistInfoPromiseArr.push(getArtistInfo('info', similars[i].name));
         artistInfoPromiseArr.push(
            getArtistInfo('topalbums', similars[i].name)
         );
      }
      Promise.all(artistInfoPromiseArr).then((results) => {
         const length = results.length - 1;
         let artist = results.map((result, index) => {
            if (index !== length && index % 2 == 0) {
               // i = 0 ------ i = 9, but not last index (9). support for logic *
               const info = result.data.artist;
               return {
                  name: info.name,
                  listeners: info.stats.listeners,
                  avatar:
                     results[index + 1].data.topalbums.album[0]?.image[3][
                        '#text'
                     ], // *, get avatar from next 'result', so index start from 0, end at 8. index must be a even number
               };
            }
         });
         artist = artist.filter((a, i) => i % 2 == 0);
         setSimilarArtists(artist);
      });
   }, []);
   return (
      similarArtists && (
         <Container>
            {similarArtists.map((artist, i) => (
               <ArtistCard artist={artist} key={i} />
            ))}
         </Container>
      )
   );
}

export default SimilarsArtists;
const Container = styled.section`
   display: flex;
   flex-wrap: wrap;
   gap: 4%;
`;
