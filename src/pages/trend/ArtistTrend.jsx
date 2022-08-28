import React from 'react';
import { Link } from 'react-router-dom';
import artistBadge from '../../assets/images/ArtistBadge.png'

function ArtistTrend({ artists }) {
   return (
      <section className='trend'>
         <h2>Artists Ranking</h2>
         <div
            className='trend-top1'
            style={{ backgroundImage: `url(${artists[0].image})` }}
         >
            <div>
               <img className='badge'
               src={artistBadge} />
               <p className='trend-position'>1</p>
               <img src={artists[0].image} />
               <Link to={`/artists/${artists[0].name}`}>{artists[0].name}</Link>
            </div>
         </div>
         <div className='trend-others'>
            {artists.map((artist, i) => (
               <div>
                  <p className='trend-position'>{i + 1}</p>
                  <img src={artist.image} />
                  <Link to={`/artists/${artist.name}`}>{artist.name}</Link>
               </div>
            ))}
         </div>
      </section>
   );
}

export default ArtistTrend;
