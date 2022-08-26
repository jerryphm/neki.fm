import { useRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { useSelector, useDispatch } from 'react-redux';
import {
   setIsPlaying,
   setTrackPosition,
   setVideoInfo,
} from '../../../../store/playerSlice';
import { playerSelector } from '../../../../store/playerSlice';
import { RiHeart2Line as LoveIcon } from 'react-icons/ri';
import {
   IoRepeatOutline as LoopIcon,
   IoShuffle as ShuffleIcon,
} from 'react-icons/io5';
import {
   BsSkipBackwardFill as PrevIcon,
   BsSkipForwardFill as NextIcon,
   BsFillPlayCircleFill as PlayIcon,
   BsFillPauseCircleFill as PauseIcon,
} from 'react-icons/bs';
import {
   FiVolume1 as MinVolumeIcon,
   FiVolume2 as MaxVolumeIcon,
} from 'react-icons/fi';
import styled from 'styled-components';

function PlayerControls() {
   //step 2: use Iframe Player API to control youtube frame. (making player)
   const { isPlaying, trackIds, trackPosition } = useSelector(playerSelector);
   const dispatch = useDispatch();
   const youtubeRef = useRef(null);
   //set loop (none/single/all)
   const [loopType, setLoopType] = useState(0);
   const setLoop = (loopIcon) => {
      const loopIconClasses = loopIcon.classList;
      if (loopType == 0) {
         setLoopType(1);
         loopIconClasses.remove('type2');
         loopIconClasses.add('type1');
      } else if (loopType == 1) {
         setLoopType(2);
         loopIconClasses.remove('type1');
         loopIconClasses.add('type2');
      } else if (loopType == 2) {
         loopIconClasses.remove('type1');
         loopIconClasses.remove('type2');
         setLoopType(0);
      }
   };
   //shuffle
   const [isShuffle, setIsShuffle] = useState(false);
   const setShuffle = () => {
      setIsShuffle(!isShuffle);
      const shuffleIconClasses =
         document.querySelector('.shuffleIcon').classList;
      if (isShuffle) shuffleIconClasses.remove('active');
      else shuffleIconClasses.add('active');
   };
   const getRandomPosition = () => {
      const newPosition = Math.floor(Math.random() * trackIds.length);
      if (newPosition !== trackPosition) {
         return newPosition;
      }
      getRandomPosition();
   };
   // next and previous song
   const setPrevNext = (type, BtnType) => {
      let position;
      const maxPosition = trackIds.length - 1;
      if (type == 'manual') {
         let newPosition;
         if (isShuffle) {
            newPosition = getRandomPosition();
            position = newPosition;
         } else if (BtnType == 'prev') {
            newPosition = trackPosition - 1;
            position = newPosition < 0 ? maxPosition : newPosition;
         } else {
            //next
            newPosition = trackPosition + 1;
            position = newPosition > maxPosition ? 0 : newPosition;
         }
      } else {
         const newPosition = isShuffle
            ? getRandomPosition()
            : trackPosition + 1;
         switch (loopType) {
            case 0: //just 'next' and stop when reach last song
               position = newPosition > maxPosition ? maxPosition : newPosition;
               if (position == maxPosition) dispatch(setIsPlaying(false));
               break;
            case 1: //remain
               youtubeRef.current.internalPlayer.seekTo(0, true);
               resetTime();
               return;
            default: //2, just 'next' and play all songs again
               position = newPosition > maxPosition ? 0 : newPosition;
         }
      }
      //prevent spam (because next and previous features use async logic to load video)
      resetTime();
      const prevNextTags = document.querySelectorAll('.prevNext-btn');
      for (let tag of prevNextTags) tag.classList.add('disable');
      dispatch(setTrackPosition(position));
      setTimeout(() => {
         for (let tag of prevNextTags) tag.classList.remove('disable');
      }, 4000);
   };
   //toggle play/pause btn
   const togglePlayState = () => {
      dispatch(setIsPlaying(!isPlaying));
      if (isPlaying) youtubeRef.current.internalPlayer.pauseVideo();
      else youtubeRef.current.internalPlayer.playVideo();
   };
   const autoplayBasedOnStates = (apiState) => {
      if (apiState == -1 && isPlaying) {
         youtubeRef.current.internalPlayer.playVideo();
      }
   };
   useEffect(() => {
      if (isPlaying) {
         youtubeRef.current.internalPlayer.playVideo()
      } else {
         youtubeRef.current.internalPlayer.pauseVideo()
      }
   }, [isPlaying])
   //set volume
   const setVolume = (value) => {
      youtubeRef.current.internalPlayer.setVolume(value);
      const minVolumeIcon = document.querySelector('.min-volume');
      if (value == 0) {
         minVolumeIcon.classList.add('mute');
      } else {
         minVolumeIcon.classList.remove('mute');
      }
   };

   //current time, duration
   let totalSecond;
   let currentSecond;

   //duration
   const convertTotalTime = (time) => {
      const minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);
      if (seconds <= 9) seconds = '0' + seconds;
      return minutes + ':' + seconds;
   };

   const getTotalTime = async (e) => {
      const totalTimeTag = document.querySelector('.time-total');
      const totalTime = await e.getDuration();
      totalTimeTag.innerHTML = convertTotalTime(totalTime);
      totalSecond = totalTime;
   };
   useEffect(() => {
      let currentTimeInteval;
      let progressInteval;
      if (isPlaying) {
         const convertCurrentTime = (time) => {
            if (time == undefined) return '0:00';
            let seconds = Math.ceil(time);
            if (seconds <= 9) {
               return '0:0' + seconds;
            } else if (seconds <= 59) {
               return '0:' + seconds;
            } else {
               const minutes = Math.floor(seconds / 60);
               seconds = seconds % 60;
               if (seconds <= 9) seconds = '0' + seconds;
               return minutes + ':' + seconds;
            }
         };
         //current time
         const currentTimeTag = document.querySelector('.time-current');
         currentTimeInteval = setInterval(() => {
            (async () => {
               const currentTime =
                  await youtubeRef.current.internalPlayer.getCurrentTime();
               currentTimeTag.innerHTML = convertCurrentTime(currentTime);
               currentSecond = currentTime;
            })();
         }, 1000);

         //progress
         const progressTag = document.querySelector('.progress-bar');
         progressInteval = setInterval(() => {
            const percent = Math.ceil((currentSecond / totalSecond) * 100);
            progressTag.value = percent;
         }, 1000);
      }
      return () => {
         clearInterval(currentTimeInteval);
         clearInterval(progressInteval);
      };
   }, [isPlaying, trackPosition]);

   //reset time
   const currentTimeTagRef = useRef();
   const totalTimeTagRef = useRef();
   const progressTagRef = useRef();
   function resetTime() {
      currentTimeTagRef.current.innerHTML = '0:00';
      progressTagRef.current.value = 0;
      totalTimeTagRef.current.innerHTML = '0:00';
   }
   //support for
   //_ changing play state when start playing new song
   //_ getting globalTime
   //_ set video info (support PlayerInfo component)
   const handleStateChange = (e) => {
      autoplayBasedOnStates(e.data);
      getTotalTime(e.target);
      dispatch(setVideoInfo(e.target.videoTitle));
   };

   return (
      <Container>
         <YtFrame
            ref={youtubeRef}
            className='yt-iframe'
            videoId={trackIds[trackPosition]}
            opts={{ playerVars: { enablejsapi: 1 } }}
            onReady={(e) => e.target.pauseVideo()}
            onError={() =>
               alert('Sorry! something went wrong, pls reload page')
            }
            onEnd={() => setPrevNext('auto')}
            onStateChange={(e) => handleStateChange(e)}
         />
         <Buttons>
            <div className='love-track'>
               <div>
                  <LoveIcon />
               </div>
            </div>
            <div className='main-buttons'>
               <div
                  onClick={(e) => setLoop(e.currentTarget)}
                  className='loop-icon loop-single loop-all icon-container'
               >
                  <LoopIcon />
               </div>
               <PrevIcon
                  className='prevNext-btn'
                  onClick={() => setPrevNext('manual', 'prev')}
               />
               <button onClick={togglePlayState} className='playOrPause-btn'>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
               </button>
               <NextIcon
                  className='prevNext-btn'
                  onClick={() => setPrevNext('manual', 'next')}
               />
               <ShuffleIcon onClick={setShuffle} className='shuffleIcon' />
            </div>
            <div className='volume'>
               <div className='min-volume icon-container'>
                  <MinVolumeIcon />
               </div>
               <input
                  onChange={(e) => setVolume(e.target.value)}
                  type='range'
               />
               <MaxVolumeIcon />
            </div>
         </Buttons>
         <Progress>
            <span ref={currentTimeTagRef} className='time-current'>
               0:00
            </span>
            <input ref={progressTagRef} type='range' className='progress-bar' />
            <span ref={totalTimeTagRef} className='time-total'>
               0:00
            </span>
         </Progress>
      </Container>
   );
}

export default PlayerControls;
const Container = styled.section`
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   max-width: 65rem;
   padding: 1.5rem 2rem;
   border-radius: 1rem;
`;

const YtFrame = styled(YouTube)`
   display: none;
   position: absolute;
   top: -60vh;
   left: 0;
   height: 350px;
   width: 690px;
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
      margin-right: 5rem;
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
      button.playOrPause-btn {
         font-size: var(--font4xl);
      }
      svg.prevNext-btn {
         color: var(--black);
         &.disable {
            opacity: 0.7;
            pointer-events: none;
         }
      }
      svg.shuffleIcon {
         color: var(--gray-text);
         &.active {
            color: var(--black);
         }
      }
      .loop-icon {
         position: relative;
         &::before {
            position: absolute;
            right: 105%;
            top: 0;
            bottom: 0;
            width: fit-content;
            color: var(--gray-text);
            font-size: 12px;
         }
         &.type1 {
            color: var(--black);
            &::before {
               content: '1';
            }
         }
         &.type2 {
            color: var(--black);
            &::before {
               content: 'all';
            }
         }
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
      .min-volume.mute {
         opacity: 0.7;
      }
      svg:last-child {
         font-size: 18px;
      }
   }

   .icon-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s linear;
   }
`;
const Progress = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 1.5rem;
   min-width: 38rem;
   margin-top: 1rem;
   font-size: 14px;
   input {
      width: calc(100% - 8rem);
      cursor: default;
      pointer-events: none;
      &::-webkit-slider-thumb {
         height: 4px;
         width: 4px;
         margin-top: 0;

         border: 2px solid var(--white);
         border-radius: 0px;
         background-color: var(--white);
      }
      &::-moz-range-thumb {
         height: 3px;
         width: 3px;

         background-color: var(--white);
         border-radius: 0px;
         border: 1px solid var(--black);
      }
   }
   span {
      min-width: 4rem;
   }
`;
