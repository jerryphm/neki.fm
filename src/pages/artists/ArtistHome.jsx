import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setArtists, artistSelector } from '../../store/artistSlice';
import styled from 'styled-components';
import client from '../../client';
import ArtistCard from './ArtistCard';

function ArtistHome() {
   const { artists } = useSelector(artistSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      if (artists == null) {
         const getArtists = async () => {
            const artistRes = await client({
               url: `/?method=geo.gettopartists&country=Viet Nam&limit=20`,
            });
            const artists = artistRes.data.topartists.artist;
            const avatarPromiseArr = [];
            const getAvatar = (artistName) =>
               client({
                  url: `/?method=artist.gettopalbums&artist=${artistName}&limit=1`,
               });
            for (let i = 0; i < 20; i++) {
               avatarPromiseArr.push(getAvatar(artists[i].name));
            }
            let avatarArr;
            await Promise.all(avatarPromiseArr).then((results) => {
               avatarArr = results.map(
                  (result) => result.data.topalbums.album[0].image[3]['#text']
               );
            });
            for (let i = 0; i < 20; i++) {
               artists[i].avatar = avatarArr[i];
            }
            dispatch(setArtists(artists));
         };
         getArtists();
      }
   }, []);

   return (
      <Container>
         <h2>
            Top Loved Artists <br />
            by Vietnamese Listeners
         </h2>
         <div>
            {artists?.map((artist, i) => (
               <ArtistCard artist={artist} key={i} />
            ))}
         </div>
      </Container>
   );
}

export default ArtistHome;
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
