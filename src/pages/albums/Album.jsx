import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../client';
import styled from 'styled-components';
import { Banner, Tracks, Albums } from '../../common';


function Album() {
   const { albumInfo } = useParams();
   const navigate = useNavigate();
   const [albums, setAlbums] = useState(null);
   useEffect(() => {
      const getAlbumData = async () => {
         const albumName = albumInfo.slice(0, albumInfo.indexOf('-'));
         const artistName = albumInfo.slice(albumInfo.indexOf('-') + 1);
         try {
            const albumInfoRes = await client({
               url: `/?method=album.getinfo&artist=${artistName}&album=${albumName}`,
            });
            const albums = albumInfoRes.data.album;
            setAlbums(albums);
         } catch {
            navigate('/albums/notfound');
         }
      };
      getAlbumData();
   }, []);
   return (
      albums && (
         <Container>
            <Banner info={albums} />
            <h2>Track List</h2>
            <Tracks tracks={albums.tracks.track}/>
         </Container>
      )
   );
}

export default Album;
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
