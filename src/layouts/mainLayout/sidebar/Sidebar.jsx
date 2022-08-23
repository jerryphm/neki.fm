import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/authSlice';
import { NavLink } from 'react-router-dom';
import client from '../../../client';

import logo from '../../../assets/images/logo.png';
import avatarFallback from '../../../assets/images/avatarFallback.jpg';
import { RiHome5Line } from 'react-icons/ri';
import { BiChart, BiAlbum, BiMenuAltRight } from 'react-icons/bi';
import { BsMusicPlayer } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

function Sidebar() {
   const [userName, setUserName] = useState('');
   const [userAvatar, setUserAvatar] = useState('');
   const { sk } = useSelector(authSelector);
   useEffect(() => {
      (async () => {
         const res = await client({
            url: `/?method=user.getInfo&sk=${sk}`,
         });
         const userName = res.data.user.name;
         const userAvatar = res.data.user.image[3]['#text'] || avatarFallback;
         setUserName(userName);
         setUserAvatar(userAvatar);
      })();
   }, []);

   const toggleSideBar = () => {
      const rawContainer = document.getElementsByTagName('aside')
      const container = rawContainer['0']
      
      container.classList.toggle('collapse')
   }
   return (
      <Container >
         <OpenIcon onClick={toggleSideBar}>
            <BiMenuAltRight />
         </OpenIcon>
         <Logo>
            <img src={logo} alt='neki' />
            <span>
               <span>Neki</span>FM
            </span>
         </Logo>
         <Nav>
            <NavLink
               to='/'
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               <RiHome5Line />
               <span>Home</span>
            </NavLink>
            <NavLink
               to='search'
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               <FiSearch />
               <span>Search</span>
            </NavLink>
            <NavLink
               to='/trend'
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               <BiChart />
               <span>Trend</span>
            </NavLink>
            <NavLink
               to='/genres'
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               <BsMusicPlayer />
               <span>Genres</span>
            </NavLink>
            <NavLink
               to='/songs'
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               <BiAlbum />
               <span>Songs</span>
            </NavLink>
         </Nav>
         <User>
            <img src={userAvatar} alt='' />
            <p>{userName}</p>
         </User>
      </Container>
   );
}

export default Sidebar;
const Container = styled.aside`
   width: 250px;
   padding: var(--padding-y) 18px var(--padding-y) var(--padding-x);
   background-color: var(--white);
   &.collapse {
      width: 150px;
   }
`;

const OpenIcon = styled.div`
   display: flex;
   justify-content: end;
   align-items: center;
   height: 40px;
   text-align: right;
   svg {
      font-size: var(--font2xl);
      color: var(--black);
      cursor: pointer;
   }
`;
const Logo = styled.div`
   display: flex;
   align-items: end;
   gap: 5px;
   margin-top: 5px;
   margin-bottom: 2.5rem;
   img {
      width: 35px;
   }
   span {
      font-size: var(--fontlg);
      span {
         color: var(--red);
      }
   }
`;

const Nav = styled.nav`
   display: flex;
   flex-direction: column;
   gap: 8px;
   color: var(--gray-text);
   & > span {
      font-size: var(--fontsm);
      color: var(--light-gray-text);
   }
   & > * {
      display: flex;
      align-items: center;
      gap: 1rem;
      height: 44px;
      width: 100%;
      padding-left: 1rem;
      border-radius: 10px;
      svg {
         font-size: var(--fontlg);
      }
   }
   & > *.active {
      position: relative;
      background-color: var(--black);
      color: var(--white);
      &::before {
         content: '';
         position: absolute;
         top: 0;
         right: -18px;
         bottom: 0;
         width: 3px;
         border-radius: 4px;
         background-color: var(--black);
         cursor: default;
      }
   }
`;

const User = styled.div`
   position: absolute;
   bottom: 0px;
   left: 0;
   right: 0;
   display: flex;
   align-items: center;
   gap: 1.6rem;
   height: 80px;
   padding: 16px 34px;
   border-top: 1px solid var(--light-gray-text);
   user-select: none;
   img {
      width: 3rem;
      height: 3rem;
      border-radius: 5rem;
   }
   p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
`;

{
   /* <span>Discover</span>
            <Link to='/'>
               <AiOutlineHeart />
               <span>New and Notable</span>
            </Link>
            <Link to='/'>
               <AiOutlineHeart />
               <span>Release Calendar</span>
            </Link>
            <Link to='/'>
               <AiOutlineHeart />
               <span>Events</span>
            </Link>
            <span>Collection</span>
            <Link to='/'>
               <AiOutlineHeart />
               <span>Favorite Songs</span>
            </Link>
            <Link to='/'>
               <AiOutlineHeart />
               <span>Artist</span>
            </Link>
            <Link to='/'>
               <AiOutlineHeart />
               <span>Albums</span>
            </Link> */
}
