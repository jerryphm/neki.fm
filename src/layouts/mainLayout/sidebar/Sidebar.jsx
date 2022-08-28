import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelector, setUserInfo } from '../../../store/authSlice';
import { NavLink } from 'react-router-dom';
import client from '../../../client';

import logo from '../../../assets/images/logo.png';
import avatarFallback from '../../../assets/images/avatarFallback.jpg';
import { RiHome5Line } from 'react-icons/ri';
import { BiChart, BiAlbum } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { GiSeaStar } from 'react-icons/gi';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import styled from 'styled-components';

function Sidebar() {
   const dispatch = useDispatch();
   const { sk, userInfo } = useSelector(authSelector);
   useEffect(() => {
      const getUserInfo = async () => {
         const res = await client({
            url: `/?method=user.getInfo&sk=${sk}`,
         });
         const name = res.data.user.name;
         const avatar = res.data.user.image[3]['#text'] || avatarFallback;
         dispatch(setUserInfo({ name, avatar }));
      };
      getUserInfo();
   }, []);

   const navLinkArr = [
      { to: '/', icon: <RiHome5Line />, display: 'Home' },
      { to: '/search', icon: <FiSearch />, display: 'Search' },
      { to: '/trend', icon: <BiChart />, display: 'Trend' },
      { to: '/artists', icon: <GiSeaStar />, display: 'Artists' },
      { to: '/albums', icon: <MdOutlineLibraryMusic />, display: 'Albums' },
      { to: '/songs', icon: <BiAlbum />, display: 'Songs' },
   ];
   const toggleSideBarWidth = () => {
      const rawContainer = document.getElementsByTagName('aside');
      const container = rawContainer['0'];
      container.classList.toggle('collapse');
   };
   return (
      <Container>
         <TbLayoutSidebarRightExpand
            className='sidebar__toggle-btn'
            onClick={toggleSideBarWidth}
         />
         <div className='sidebar__logo'>
            <img src={logo} />
            <span>
               <span>Neki</span>FM
            </span>
         </div>
         <nav>
            {navLinkArr.map((navLink, i) => (
               <NavLink
                  to={navLink.to}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  key={i}
               >
                  {navLink.icon}
                  <span>{navLink.display}</span>
               </NavLink>
            ))}
         </nav>
         <div className='sidebar__user'>
            <img src={userInfo?.avatar} />
            <span>{userInfo?.name}</span>
         </div>
      </Container>
   );
}

export default Sidebar;
const Container = styled.aside`
   position: relative;
   flex-shrink: 0;
   flex-grow: 0;
   width: clamp(200px, 19%, 235px);
   padding: var(--padding-y) var(--padding-x);
   background-color: var(--white);
   transition: 0.25s linear;

   svg.sidebar__toggle-btn {
      display: block;
      height: 40px;
      margin-left: auto;
      font-size: var(--font2xl);
      color: var(--light-gray-text);
      cursor: pointer;
   }

   .sidebar__logo {
      display: flex;
      align-items: end;
      gap: 5px;
      margin-top: 2.5rem;
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
   }

   nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      a {
         display: flex;
         align-items: center;
         gap: 1rem;
         height: 4.4rem;
         width: 100%;
         padding-left: 1rem;
         border-radius: 10px;
         color: var(--gray-text);
         svg {
            font-size: var(--fontlg);
         }
      }
      a.active {
         position: relative;
         background-color: var(--black);
         color: var(--white);
         &::before {
            content: '';
            position: absolute;
            top: 0;
            right: -24px;
            bottom: 0;
            width: 3px;
            border-radius: 4px;
            background-color: var(--black);
            cursor: default;
         }
      }
   }

   .sidebar__user {
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.6rem;
      height: 80px;
      padding: 0 var(--padding-x);
      border-top: 1px solid var(--light-gray-text);
      user-select: none;
      transition: 0.25s linear;
      img {
         width: 3rem;
         height: 3rem;
         border-radius: 5rem;
      }
      span {
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }
   }

   /* use for toggleSideBarWidth button */
   span {
      transition: 0.25s linear;
   }
   &.collapse {
      width: 86px;
      span {
         opacity: 0;
         font-size: 0px;
      }
      svg.sidebar__toggle-btn {
         transform: rotate(180deg);
      }
      .sidebar__user {
         gap: 0;
      }
   }
`;
