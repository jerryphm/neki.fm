import React from 'react'
import styled from 'styled-components'
import NavButtons from './NavButtons'
import InputSearch from './InputSearch'

function Header() {
  return (
    <Container>
      <NavButtons />
      <InputSearch />
    </Container>
  )
}

export default Header

const Container = styled.header`
   /* position: fixed;
   z-index: 999;
   top: 0;
   right: 0;
   left: 250px;
   display: flex;
   align-items: center;
   gap: 10%;
   padding: var(--padding-y) var(--padding-x);
   background-color: var(--outer-bg); */
`