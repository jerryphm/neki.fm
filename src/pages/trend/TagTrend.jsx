import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function TagTrend({ tags }) {
   const correct = (taggings) => (Number(taggings) / 100000).toFixed(1);
   const getColor = () => Math.random() * 2
   
   return (
      <Container>
         <h2>Top Tags</h2>
         {tags?.map((tag, i) => (
            <Link to={`/search/tag/${tag.name}`} className='tag' key={i}>
               <p>{i + 1}</p>
               <p className='ellipsis'>{tag.name}</p>
               <p className='ellipsis' color={getColor() ? 'green' : 'red'}>{correct(tag.taggings)}M</p>
            </Link>
         ))}
      </Container>
   );
}

export default TagTrend;
const Container = styled.section`
   h2 {
      font-size: var(--fontxl);
      margin-bottom: 1.5rem;
   }
   a {
      position: relative;
      display: flex;
      align-items: center;
      gap: 5%;
      height: 50px;
      width: 100%;
      padding: 0 16px;
      border-radius: 1rem;
      margin-bottom: 1rem;
      cursor: pointer;
      overflow: hidden;
      background-color: #fff;
      p {
         user-select: none;
      }
      p:first-child {
        min-width: 1.4rem;
      }
      p:nth-child(2) {
        text-transform: capitalize;
      }
      p:last-child {
         margin-left: auto;
         color: ${props => props.color};
      }
   }
`;
