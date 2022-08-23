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
            <span>2:35</span>
            <input type='range' name='progress-bar' id='' />
            <span>4:02</span>
         </Progress>
      </Container>
   );
}

export default PlayerControls;
const Container = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   max-width: 65rem;
   padding: 1.5rem 2rem;
   border-radius: 1rem;

   /* css input track and thumb */
   input {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
   }
   input::-webkit-slider-runnable-track {
         background: var(--black);
         height: 0.4rem;
         border-radius: 5px;
   }
   input::-moz-range-track {
      background: var(--black);
      height: 0.4rem;
      border-radius: 5px;
   }
   input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      margin-top: calc(2px - 4px);
      height: 0.8rem;
      width:0.8rem;
      border: 2px solid var(--black);
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
      border: 2px solid var(--black);
      border-radius: 1rem;
   }
   input:focus {
      outline: none;
   }
`;
const Buttons = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
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
      margin-right: 1.5rem;
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
      width: 18rem;
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
      max-width: 15.5rem;
      flex-shrink: 0;
      gap: 0.4rem;
      padding-left: 7%;
      svg {
         min-width: fit-content;
      }
      input {
         max-width: 65px;
      }
   }
`;
const Progress = styled.div`
   display: flex;
   align-items: center;
   gap: 2rem;
   margin-top: 1rem;
   font-size: 14px;
   input {
      width: 100%;
   }
`;
