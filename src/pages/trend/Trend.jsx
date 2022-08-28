import React from 'react';
import { useEffect } from 'react';
import { ArtistTrend, TagTrend, TrackTrend } from './index';
import { useSelector, useDispatch } from 'react-redux';
import client from '../../client';
import styled from 'styled-components';
import {
   trendingSelector,
   setArtists,
   setTracks,
   setTags,
} from '../../store/trendingSlice';

function Trend() {
   const { artists, tracks, tags } = useSelector(trendingSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      if (artists == null) {
         (async () => {
            const limit = 20;
            const getTrendData = (type, limit) =>
               client({
                  url: `/?method=chart.get${type}&limit=${limit}`,
               });
            let artists;
            let tracks;
            let tags;
            await Promise.all([
               getTrendData('topartists', 20),
               getTrendData('toptracks', 20),
               getTrendData('toptags', 20),
            ]).then((results) => {
               results.forEach((result) => {
                  if (result.data.artists) {
                     artists = result.data.artists.artist;
                  } else if (result.data.tracks) {
                     tracks = result.data.tracks.track;
                  } else {
                     tags = result.data.tags.tag; //tag
                  }
               });
            });
            console.log(tags)
            //get track image
            const getImage = (trackName) =>
               client({
                  url: `/?method=album.search&album=${trackName}&limit=1`,
               });
            const imagePromiseArr = [];

            for (let i = 0; i < limit; i++) {
               imagePromiseArr.push(getImage(tracks[i].name));
            }
            await Promise.all(imagePromiseArr).then((results) => {
               for (let i = 0; i < limit; i++) {
                  tracks[i].image =
                     results[i].data.results.albummatches.album[0].image[3][
                        '#text'
                     ];
               }
            });

            //get artist profile picture
            const getAvatar = (artistName) =>
               client({
                  url: `/?method=artist.gettopalbums&artist=${artistName}&limit=1`,
               });
            const avatarPromiseArr = [];
            for (let i = 0; i < limit; i++) {
               avatarPromiseArr.push(getAvatar(artists[i].name));
            }
            await Promise.all(avatarPromiseArr).then((results) => {
               for (let i = 0; i < limit; i++) {
                  artists[i].image =
                     results[i].data.topalbums.album[0].image[3]['#text'];
               }
            });
            dispatch(setArtists(artists));
            dispatch(setTags(tags));
            dispatch(setTracks(tracks));
         })();
      }
   }, []);
   return (
      artists && (
         <Container>
            <TagTrend tags={tags} />
            <ArtistTrend artists={artists} />
            <TrackTrend tracks={tracks} />
         </Container>
      )
   );
}

export default Trend;
const Container = styled.section`
   display: flex;
   justify-content: space-between;
   gap: 2%;
   height: calc(100vh - 18rem);
   overflow: scroll;
   & > section:first-child {
      min-width: calc(30% - 1.3%);
      flex-grow: 0;
   }
   & > section {
      width: calc(33% - 1.3%);
   }
   .trend {
      h2 {
         font-size: var(--fontxl);
         margin-bottom: 1.5rem;
         color: var(--black);
      }
      img {
         height: 4rem;
         width: 4rem;
         border-radius: 5rem;
      }
      img.badge {
         position: absolute;
         top: 0;
         right: 5%;
         transform: translateY(-50%);
         height: 3rem;
         width: 3rem;
      }
      .trend-position {
         min-width: 1.7rem;
      }

      .trend-top1 {
         min-height: 20rem;
         padding: 1rem 2.5rem;
         overflow: hidden;
         border-radius: 0.7rem;
         position: relative;
         background-repeat: no-repeat;
         background-size: cover;
         div {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            gap: 8%;
            align-items: center;
            height: 6.5rem;
            padding: 1.5rem 2rem;
            background-color: rgba(255, 255, 255, 1);
            color: var(--black);
            p:first-child {
               font-size: 20px;
               font-weight: bolder;
            }
         }
      }
      .trend-others {
         display: flex;
         flex-direction: column;
         gap: 1rem;
         margin-top: 1rem;
         & > div:first-child {
            display: none;
         }
         div {
            display: flex;
            align-items: center;
            gap: 8%;
            height: 6.2rem;
            padding: 1.5rem 2rem;
            background-color: var(--white);
            border-radius: 0.7rem;
            color: var(--black);
            a:last-child {
               cursor: pointer;
            }
         }
      }
   }
`;
