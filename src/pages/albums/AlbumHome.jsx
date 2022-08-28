import React from 'react';
import { useEffect } from 'react';
import client from '../../client';
import { useSelector, useDispatch } from 'react-redux';
import { artistSelector } from '../../store/artistSlice';
import { setAlbums } from '../../store/albumSlice';
import { albumSelector } from '../../store/albumSlice';
import ArtistCard from '../artists/ArtistCard';
import styled from 'styled-components';
import { Albums } from '../search/tag';

function AlbumHome() {
   const dispatch = useDispatch();
   const { artists } = useSelector(artistSelector);
   const { albums } = useSelector(albumSelector);
   useEffect(() => {
      if (albums == null) {
         const getTopArtist = async () => {
            let topArtists = artists || null;
            if (!topArtists) {
               const topArtistRes = await client({
                  url: `/?method=geo.gettopartists&country=Viet Nam&limit=20`,
               });
               topArtists = topArtistRes.data.topartists.artist;
            }
            const getTopAlbum = (artistName) =>
               client({
                  url: `/?method=artist.gettopalbums&artist=${artistName}&limit=2`,
               });
            const topAlbumPromiseArr = [];
            for (let i = 0; i < topArtists.length; i++) {
               topAlbumPromiseArr.push(getTopAlbum(topArtists[i].name));
            }
            Promise.all(topAlbumPromiseArr).then((results) => {
               const albums = results.map(
                  (result) => result.data.topalbums.album[1]
               );
               dispatch(setAlbums(albums));
            });
         };
         getTopArtist();
      }
   }, []);
   return (
      albums && (
         <Container>
            <h2>
               Most Loved Albums <br />
               by Vietnames Listeners
            </h2>
            <Albums albums={albums} />
         </Container>
      )
   );
}

export default AlbumHome;

const Container = styled.section`
   height: calc(100vh - 18rem);
   overflow: scroll;
   & > h2 {
      font-size: var(--fontxl);
      margin-bottom: 1.5rem;
   }
   & > div {
      display: flex;
      flex-wrap: wrap;
      gap: 4%;
      height: var(100vh - 17rem);
   }
`;
