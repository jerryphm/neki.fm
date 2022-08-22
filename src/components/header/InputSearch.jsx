import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import apiClient from '../../apiClient';
import {
   setAlbums,
   setArtists,
   setTracks,
} from '../../store/search/searchSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function InputSearch() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [searchTerm, setSearchTerm] = useState('');
   const handleSearch = () => {
      if (searchTerm.trim()) {
         const getInfo = async (type, limit = 5) =>
            apiClient({
               url: `/?method=${type}.search&${type}=${searchTerm}&limit=${limit}`,
            });
         Promise.all([
            getInfo('album'),
            getInfo('artist'),
            getInfo('track', 15),
         ])
            .then((results) => {
               const albums = results[0].data.results.albummatches.album;
               const artists = results[1].data.results.artistmatches.artist;
               const tracks = results[2].data.results.trackmatches.track;

               if (albums[0]) {
                  dispatch(setAlbums(albums));
                  dispatch(setArtists(artists));
                  dispatch(setTracks(tracks));
                  
                  navigate(`/search/${searchTerm}`);
               } else {
                  navigate('/search/notfound');
               }

               setSearchTerm('');
            })
            .catch(() => alert('opps, something went wrong.Pls try again'));
      } else {
         navigate('/search');
      }
   };

   return (
      <Container>
         <div>
            <input
               type='text'
               placeholder='Search for artist, songs and...'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onKeyDown={(e) => e.key == 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>
               <FiSearch />
            </button>
         </div>
      </Container>
   );
}

export default InputSearch;

const Container = styled.section`
   position: relative;
   display: flex;
   align-items: center;
   height: 40px;
   width: 60%;
   padding: 1rem 1.4rem 1rem 5rem;
   border-radius: 5rem;
   background-color: var(--white);
   input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 15px;
      ::placeholder {
         color: var(--light-gray-text);
      }
   }
   button {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 5rem;
      border-radius: 5rem;
      font-size: var(--fontlg);
   }
`;
