import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { playerSelector } from '../../../store/playerSlice';
function PlayerInfo() {
   const {videoInfo} = useSelector(playerSelector);
   return (
      <Container>
         {videoInfo || '"Music gives color to the air of the moment."'}
      </Container>
   );
}
export default PlayerInfo;
const Container = styled.section``;
