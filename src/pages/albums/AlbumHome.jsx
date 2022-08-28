import React from 'react';
import { useEffect } from 'react';
import client from '../../client';
import { useSelector, useDispatch } from 'react-redux';
import { artistSelector } from '../../store/artistSlice';
import { setAlbums } from '../../store/searchSlice';
import { albumSelector } from '../../store/albumSlice';

function AlbumHome() {
   const dispatch = useDispatch();
   const { artists } = useSelector(artistSelector);
   const { albums } = useSelector(albumSelector);
   useEffect(() => {
      const getTopArtist = async () => {
         let topArtists = artists || null;
         if (!topArtists) {
            const topArtistRes = await client({
               url: `/?method=geo.gettopartists&country=Viet Nam&limit=20`,
            });
            topArtists = topArtistRes.data.artists.artist;
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
            console.log(albums);
            dispatch(setAlbums(albums));
         });
      };
      getTopArtist();
   }, []);
   return albums && <div>AlbumHome</div>;
}

export default AlbumHome;
