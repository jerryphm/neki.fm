import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <Container>Footer</Container>
  )
}

export default Footer
const Container = styled.footer`
   position: fixed;
   bottom: 0;
   left: 250px;
   right: 0;
   height: 80px;
   padding: var(--padding-y) var(--padding-x);
   /* background-color: #fff; */
`