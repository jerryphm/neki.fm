import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../client';
import styled from 'styled-components';

import { Banner, Tracks } from '../../common';
import { Albums } from '../search/tag';
import SimilarsArtists from './SimilarsArtists';
import { useRef } from 'react';

function Artist() {
   const { artistName } = useParams();
   const [artistInfo, setArtistInfo] = useState(null);
   const [tracks, setTracks] = useState(null);
   const [albums, setAlbums] = useState(null);

   useEffect(() => {
      const getArtistData = (type, limit) =>
         client({
            url: `/?method=artist.get${type}&artist=${artistName}&limit=${limit}`,
         });
      Promise.all([
         getArtistData('info'),
         getArtistData('toptracks', 10),
         getArtistData('topalbums', 10),
      ]).then((results) => {
         const artistInfo = results[0].data.artist;
         const topTracks = results[1].data.toptracks.track;
         const topAlbum = results[2].data.topalbums.album;
         setArtistInfo(artistInfo);
         setTracks(topTracks);
         setAlbums(topAlbum);
      });
   }, [artistName]);

   const containerRef = useRef(null);
   if (containerRef.current) {
      containerRef.current.scrollTo({
         top: '100%',
         left: 0,
         behavior: 'smooth',
      });
   }
   return (
      artistInfo && (
         <Container ref={containerRef}>
            <Banner info={artistInfo} />
            <h2>Top Tracks</h2>
            <Tracks tracks={tracks} />
            <h2>Most Loved Albums</h2>
            <Albums albums={albums} />
            <h2>Similars to {artistName}</h2>
            <SimilarsArtists similars={artistInfo.similar.artist} />
         </Container>
      )
   );
}

export default Artist;
const Container = styled.section`
   height: calc(100vh - 19rem);
   overflow: scroll;
   h2 {
      margin: 3rem 0 1.5rem;
      font-size: var(--font2xl);
   }
   h2:last-child {
      margin: 2rem 0 1.5rem;
   }
`;
