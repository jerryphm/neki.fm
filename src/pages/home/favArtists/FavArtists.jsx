import React from 'react';
import styled from 'styled-components';
import client from '../../../client';
import { artistSelector, setFavArtists } from '../../../store/artistSlice';
import { authSelector } from '../../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ArtistCard from './ArtistCard';

function FavArtists() {
   const { favArtists } = useSelector(artistSelector);
   const { userInfo } = useSelector(authSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      if (favArtists == null && userInfo) {
         const getFavArtists = async () => {
            const res = await client({
               url: `/?method=user.gettopartists&user=${userInfo.name}&limit=4`,
            });
            const artists = res.data.topartists.artist;
            const getAvatar = (artistName) =>
               client({
                  url: `/?method=artist.gettopalbums&artist=${artistName}&limit=1`,
               });
            Promise.all([
               getAvatar(artists[0].name),
               getAvatar(artists[1].name),
               getAvatar(artists[2].name),
               getAvatar(artists[3].name),
            ]).then((results) => {
               const avatarArr = results.map(
                  (result) => result.data.topalbums.album[0].image[3]['#text']
               );
               for (let i = 0; i < artists.length; i++) {
                  artists[i].avatar = avatarArr[i];
               }
               dispatch(setFavArtists(artists));
            });
         };
         getFavArtists();
      }
   }, [userInfo, favArtists]);
   console.log(favArtists)
   return <Container>
      <h2>Fav Artists</h2>
      {favArtists?.map((artist, i) => (
         <ArtistCard avatar={artist.avatar} name={artist.name} playcount={artist.playcount} key={i}/>
      ))}
   </Container>;
}

export default FavArtists;
const Container = styled.section`
   margin-top: 3rem;
   h2 {
      font-size: var(--font2xl);
      margin-bottom: 0.8rem;
   }
`
