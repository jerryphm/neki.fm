import React from 'react';
import styled from 'styled-components';
import { AiFillPlayCircle } from 'react-icons/ai';

function Albums({ albums }) {
   return (
      <Container>
         <h2>Top Albums</h2>
         <div>
            {albums.map((album, i) => (
               <a
                  href='#'
                  style={{ backgroundImage: `url(${album.image[3]['#text']})` }}
                  key={i}
               >
                  <span>
                     <span> {album.name}</span>
                     <br />
                     {album.artist.name}
                  </span>
                  <button>
                     Listen now <AiFillPlayCircle />
                  </button>
               </a>
            ))}
         </div>
      </Container>
   );
}

export default Albums;

const Container = styled.section`
   margin: 3rem 0 10rem;
   h2 {
      font-size: var(--fontxl);
      margin-bottom: 1rem;
   }
   div {
      display: flex;
      flex-wrap: wrap;
      gap: 2%;

      a {
         position: relative;
         width: calc((100% - 6%) / 4);
         min-width: 150px;
         padding-top: 26%;
         margin-bottom: 2rem;
         background: no-repeat center/cover;
         border-radius: 1rem;
         overflow: hidden;
         user-select: none;
         box-shadow: 0 0 5px #e7e5e5;
         & > span {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: inline-block;
            background-color: var(--white);
            padding: 5px 1rem;
            border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 1rem;
            font-size: 14px;
            color: var(--gray-text);

            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            span {
               color: var(--black);
            }
         }
         button {
            position: absolute;
            top: 50%;
            left: 50%;
            height: 38px;
            width: fit-content;
            padding: 0 1.4rem;
            border-radius: 5rem;
            background-color: var(--white);
            border: 1px solid var(--black);
            color: var(--black);
            font-size: var(--fontxs);
            white-space: nowrap;

            opacity: 0;
            transform: translate(-50%, -5%);
            visibility: hidden;
            transition: 0.25s linear;
            svg {
               margin-left: 5px;
            }
         }
         &::before {
            content: '';
            position: absolute;
            inset: 0;
            background-color: var(--black);
            opacity: 0;
            transition: 0.25s linear;
         }
      }
      a:hover {
         &::before {
            opacity: 0.4;
         }
         button {
            opacity: 1;
            transform: translate(-50%, -75%);
            visibility: visible;
         }
      }
   }
`;
