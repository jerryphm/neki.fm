import { useLayoutEffect, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import client from '../../client';
import MD5 from 'crypto-js/md5';
import {
   authSelector,
   setToken,
   setAuthorized,
   setSk,
} from '../../store/authSlice';
import neki from '../../assets/images/logo.png';
import lastfm from '../../assets/images/lastfm.png';
import styled from 'styled-components';

function Connect() {
   const [isAuthorizedState, setAuthorizedState] = useState(false);

   //request authorization from the user
   const { api_key, secret } = useSelector(authSelector);
   const handleConnect = () => {
      window.location.href = 'http://www.last.fm/api/auth/?api_key=' + api_key;
   };

   //get token, session key and hide connect page, after redirecting
   const dispatch = useDispatch();
   const url = window.location.href;
   useLayoutEffect(() => {
      if (url.includes('?token=')) {
         //server redirects to the homepage with only 'token' param
         setAuthorizedState(true);
         const arr = url.split('?token=');
         const token = arr[1];
         const homepage = arr[0];
         const getSk = async () => {
            try {
               const api_sig = MD5(
                  `api_key${api_key}methodauth.getSessiontoken${token + secret}`
               );
               const res = await client({
                  url: `/?method=auth.getSession&api_sig=${api_sig}&token=${token}`,
               });
               dispatch(setSk(res.data.session.key));
               dispatch(setAuthorized(true));
               dispatch(setToken(token));
            } catch {
               window.location.href = homepage;
            }
         };
         getSk();
      }
   }, []);

   //demo account
   console.group('demo account:');
   console.log('username: mr-john-doe');
   console.log('pass: mr-john-doe-1');
   console.groupEnd();
   useEffect(() => {
      alert(
         'Please use the demo account shown in console tab (or use your account if you already had'
      );
      return console.clear;
   });

   return (
      !isAuthorizedState && (
         <Wrapper>
            <Container>
               <Logos>
                  <Logo>
                     <img src={neki} alt='nekiFM' />
                     <p>NekiFM</p>
                  </Logo>
                  <Line>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span></span>
                  </Line>
                  <Logo>
                     <img src={lastfm} alt='lastFM' />
                     <p>LastFM</p>
                  </Logo>
               </Logos>
               <Button onClick={handleConnect}>Connect</Button>
            </Container>
         </Wrapper>
      )
   );
}
export default Connect;

const Wrapper = styled.section`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100vw;
   height: 100vh;
`;
const Container = styled.section`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
   width: clamp(40rem, 40vw, 70rem);
   height: 36rem;
   max-height: 70vh;
   padding: 0 3rem;
   border-radius: 1.5rem;
   background-color: var(--white);
`;
const Logos = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 2rem;
   div:first-child {
      width: 30%;
   }
`;
const Logo = styled.div`
   width: 25%;
   p {
      margin-top: 1rem;
      text-align: center;
   }
`;
const Line = styled.div`
   flex-grow: 1;
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 3rem;
   transform: translateY(-1.5rem);
   span {
      height: 100%;
      width: 5px;
      border-radius: 5rem;
      background-color: var(--pink);
      animation: musicWave 1s linear infinite;
   }
   @keyframes musicWave {
      50% {
         height: 20%;
      }
      100% {
         height: 100%;
      }
   }
   span:first-child {
      animation-delay: 0s;
   }
   span:nth-child(2) {
      animation-delay: 0.3s;
   }

   span:nth-child(3) {
      animation-delay: 0.6s;
   }
   span:nth-child(4) {
      animation-delay: 0.9s;
   }
   span:nth-child(5) {
      animation-delay: 0.3s;
   }
   span:nth-child(6) {
      animation-delay: 0.6s;
   }
   span:nth-child(7) {
      animation-delay: 0.9s;
   }
   span:nth-child(8) {
      animation-delay: 0.3s;
   }
   span:nth-child(9) {
      animation-delay: 0.6s;
   }
`;

const Button = styled.button`
   height: 5.5rem;
   width: fit-content;
   padding: 0 3rem;
   border-radius: 1rem;
   background-color: var(--red);
   color: var(--white);
   font-size: var(--fontlg);
   transition: 50ms linear;
   &:hover {
      background-color: var(--pink);
   }
`;
