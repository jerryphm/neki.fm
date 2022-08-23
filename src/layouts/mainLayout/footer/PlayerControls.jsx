import { useState } from 'react';
import styled from 'styled-components';
import { RiHeart2Line } from 'react-icons/ri';
import { IoRepeatOutline, IoShuffle } from 'react-icons/io5';
import {
   BsSkipBackwardFill,
   BsSkipForwardFill,
   BsFillPlayCircleFill,
   BsFillPauseCircleFill,
} from 'react-icons/bs';

import { FiVolume1, FiVolume2 } from 'react-icons/fi';

function PlayerControls() {
   const [isPlay, setPlay] = useState(false);
   return (
      <Container>
         <Buttons>
            <div className='love-track'>
               <div>
                  <RiHeart2Line />
               </div>
            </div>
            <div className='main-buttons'>
               <IoRepeatOutline />
               <BsSkipBackwardFill />
               {isPlay ? <BsFillPlayCircleFill /> : <BsFillPauseCircleFill />}
               <BsSkipForwardFill />
               <IoShuffle />
            </div>
            <div className='volume'>
               <FiVolume1 />
               <input type='range' name='volume' />
               <FiVolume2 />
            </div>
         </Buttons>
         <Progress>
            <input type="range" name="progress-bar" id="" />
         </Progress>
      </Container>
   );
}

export default PlayerControls;
const Container = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 1.5rem 2rem;
   border-radius: 1rem;
`;
const Buttons = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 2rem;
   font-size: var(--fontxl);
   color: var(--gray-text);
   & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      svg {
         cursor: pointer;
      }
   }

   .love-track {
      div {
         display: flex;
         align-items: center;
         justify-content: center;
         width: 26px;
         height: 26px;
         border-radius: 5px;
         background-color: var(--outer-bg);
      }
   }
   .main-buttons {
      gap: 1.5rem;
      svg:nth-child(2),
      svg:nth-child(3),
      svg:nth-child(4) {
         color: var(--black);
      }
      svg:nth-child(3) {
         font-size: var(--font4xl);
      }
   }

   .volume {
      flex-shrink: 0;
      gap: 0.4rem;

      padding-left: 7%;
      input {
         -webkit-appearance: none;
         appearance: none;
         background: transparent;
         cursor: pointer;
         width: 70%;
         max-width: 70px;
      }
      input::-webkit-slider-runnable-track,
      input::-moz-range-track {
         background: var(--black);
         height: 0.4rem;
         border-radius: 5px;
      }
      input::-webkit-slider-thumb {
         -webkit-appearance: none;
         appearance: none;
         margin-top: calc(2px - 4px);
         height: 0.5rem;
         width: 0.5rem;
         border: 3px solid var(--black);
         border-radius: 1rem;
         background-color: var(--white);
         background-clip: content-box;
      }
      input::-moz-range-thumb {
         border: none; /*Removes extra border that FF applies*/
         border-radius: 0; /*Removes default border-radius that FF applies*/
         background-color: var(--white);
         height: 0.5rem;
         width: 0.5rem;
         border: 3px solid var(--black);
         border-radius: 1rem;
      }
      input:focus {
         outline: none;
      }
   }
`;
const Progress = styled.div`
   input {
      width: 100%;
   }
`;
