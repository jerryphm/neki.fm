import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../../client';
import styled from 'styled-components';
import { Heading, Artists, Albums } from './index';

function Tag() {
   const [info, setInfo] = useState(null);
   const { tagKeyWord } = useParams();
   useEffect(() => {
      const getInfo = (type, limit = 50) =>
         apiClient({
            url: `/?method=tag.get${type}&limit=${limit}&tag=${tagKeyWord}`,
         });
      Promise.all([
         getInfo('info'),
         getInfo('topalbums'),
         getInfo('topartists'),
         getInfo('toptracks', 15),
      ])
         .then((results) => {
            const intro = results[0].data.tag;
            const albums = results[1].data.albums.album;
            const artists = results[2].data.topartists.artist;
            const tracks = results[3].data.tracks.track;
            console.log({ intro, albums, artists, tracks });
            setInfo({ intro, albums, artists, tracks });
         })
         .catch(() => alert('opps! something went wrong'));
   }, []);
   const { intro, albums, artists } = info || {};
   return (
      info && (
         <Container>
            <Heading intro={intro} />
            <Artists artists={artists} />
            <Albums albums={albums} />
         </Container>
      )
   );
}

export default Tag;
const Container = styled.section`
   height: calc(100vh - var(--header-height));
   overflow: scroll;
   /* Hide scrollbar for Chrome, Saf   ari and Opera */
   &::-webkit-scrollbar {
      display: none;
   }

   /* Hide scrollbar for IE, Edge and Firefox */
   & {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
   }
`;
