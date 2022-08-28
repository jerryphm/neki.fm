import React from 'react';
import { Link } from 'react-router-dom';
import trackBadge from '../../assets/images/TrackBadge.png';
import fallbackImage from '../../assets/images/fallback.jpg'

function TrackTrend({ tracks }) {
   return (
      <section className='trend'>
         <h2>Tracks Ranking</h2>
         <div
            className='trend-top1'
            style={{ backgroundImage: `url(${tracks[0].image})` }}
         >
            <div>
               <img className='badge' src={trackBadge} alt='' />
               <p className='trend-position'>1</p>
               <img src={tracks[0].image} />
               <Link to={`/tracks/${tracks[0].name}`} className='ellipsis'>{tracks[0].name}</Link>
            </div>
         </div>
         <div className='trend-others'>
            {tracks.map((track, i) => (
               <div>
                  <p className='trend-position'>{i + 1}</p>
                  <img src={track.image || fallbackImage} />
                  <Link to={`/tracks/${track.name}`} className='ellipsis'>{track.name}</Link>
               </div>
            ))}
         </div>
      </section>
   );
}

export default TrackTrend;
