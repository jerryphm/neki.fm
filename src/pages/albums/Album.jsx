import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../client';
import styled from 'styled-components';
import { Banner, Tracks, Albums } from '../../common';

function Album() {
   const { albumInfo } = useParams();
   const [albums, setAlbums] = useState(null);
   const [isOk, setOk] = useState(true);
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
            setOk(false);
         }
      };
      getAlbumData();
   }, []);
   return albums ? (
      <Container>
         <Banner info={albums} isPassAlbum />
         <h2>Track List</h2>
         {albums.tracks ? (
            <Tracks tracks={albums.tracks.track} />
         ) : (
            <p>Sorry! Track list not found ☹️</p>
         )}
      </Container>
   ) : (
      isOk || (
         <div className='album-not-found'>
            <h3>Opps!</h3>
            <p>Album not found, please try again.</p>
         </div>
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
