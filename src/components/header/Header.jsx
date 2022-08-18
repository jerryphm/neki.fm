import React from 'react'
import styled from 'styled-components'
import NavButtons from './NavButtons'
import Search from './Search'

function Header() {
  return (
    <Container>
      <NavButtons />
      <Search />
    </Container>
  )
}

export default Header
const Container = styled.header`
   position: fixed;
   top: 0;
   right: 0;
   left: 250px;
   display: flex;
   align-items: center;
   gap: 10%;
   padding: var(--padding-y) var(--padding-x);
`