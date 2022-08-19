import React from 'react';
import styled from 'styled-components';
import { BiMenuAltRight } from 'react-icons/bi';
import { RiHome5Line } from 'react-icons/ri';
import { BiChart, BiAlbum } from 'react-icons/bi';
import { BsMusicPlayer } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import {FiSearch} from 'react-icons/fi'
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

function Sidebar() {
   return (
      <Container>
         <OpenIcon>
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
            {/* <span>Discover</span>
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
            </Link> */}
         </Nav>
      </Container>
   );
}

export default Sidebar;
const Container = styled.aside`
   position: fixed;
   top: 0;
   left: 0;
   bottom: 0;
   width: 250px;
   padding: var(--padding-y) 18px var(--padding-y) var(--padding-x);
   background-color: var(--white);
`;

const OpenIcon = styled.div`
   height: 24px;
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
