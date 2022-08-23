import { useState } from 'react';
import apiClient from '../../../client';
import styled from 'styled-components';
import { useMemo } from 'react';

function Artists({ artists }) {
   let [renderedContent, setRenderedContent] = useState(null);
   useMemo(() => {
      const getProfilePicture = async (artistName) => {
         return apiClient({
            url: `/?method=artist.gettopalbums&artist=${artistName}&limit=1`,
         });
      };
      Promise.all([
         getProfilePicture(artists[0].name),
         getProfilePicture(artists[1].name),
         getProfilePicture(artists[2].name),
         getProfilePicture(artists[3].name),
         getProfilePicture(artists[4].name),
      ]).then((results) => {
         const profilePictures = results.map((result) => ({
            img: result.data.topalbums.album[0].image[3]['#text'],
         }));
         const renderedContent = artists.map((artist, i) => ({
            ...artist,
            ...profilePictures[i],
         }));
         setRenderedContent(renderedContent);
      });
   }, [artists]);

   return (
      renderedContent && (
         <Container>
            <h2>Top Artists</h2>
            <div>
               {renderedContent.map((r, i) => (
                  <a
                     href='#'
                     style={{ backgroundImage: `url(${r.img})` }}
                     key={i}
                  >
                     <span>
                        <span>{r.name}</span>
                        <br />
                        Listeners: {r.listeners}
                     </span>
                  </a>
               ))}
            </div>
         </Container>
      )
   );
}

export default Artists;
const Container = styled.section`
   h2 {
      margin-top: 1rem;
      margin-bottom: 2rem;
      font-size: var(--fontxl);
   }
   div {
      display: grid;
      grid-template-columns: 19% 19% 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
         'i1 i1 i2 i3'
         'i1 i1 i4 i5';
      gap: 1.5rem;
      a:first-child {
         grid-area: i1;
      }
      a:nth-child(2) {
         grid-area: i2;
      }
      a:nth-child(3) {
         grid-area: i3;
      }
      a:nth-child(4) {
         grid-area: i4;
      }
      a:nth-child(5) {
         grid-area: i5;
      }
      a {
         position: relative;
         background-repeat: no-repeat;
         background-size: cover;
         background-position: center;
         border-radius: 1rem;
         overflow: hidden;
         box-shadow: 0 0 5px #c3c1c1;
         &:first-child {
            padding-top: 300px;
         }
         & > span {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            padding: 5px 10px;
            background-color: var(--white);
            color: var(--black);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            color: var(--gray-text);
            span {
               color: var(--black);
            }
         }
      }
   }
`;
