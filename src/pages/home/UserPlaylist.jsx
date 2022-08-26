import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import {authSelector} from '../../store/authSlice'
import styled from 'styled-components';
import client from '../../client';
import Track from '../../common/Track';


function UserPlaylist() {
  const {userInfo} = useSelector(authSelector)
  // const [tracks, setTracks]
  useEffect(() => {
    const getUserLovedTracks = async () => {
      const res = await client({
        url: `/?method=user.getlovedtracks&user=${userInfo.name}&limit=20`
      })
      const tracks = res.data.lovedtracks.track
      console.log(res.data)
    }
    getUserLovedTracks()
  }, [])
   return (
      <Container>
         <div className='home-playlist-title'>
            <h2>My Playlist</h2>
            <button>Show All</button>
         </div>
         <div className='home-playlist-tracks'>
            <div className='home-playlist-tracks__heading'>
              <span>#</span>
              <span>TITLE</span>
              <span>ARTIST</span>
              <span>TIME</span>
              <span>ALBUM</span>
            </div>
            
         </div>
      </Container>
   );
}

export default UserPlaylist;
const Container = styled.section``;
