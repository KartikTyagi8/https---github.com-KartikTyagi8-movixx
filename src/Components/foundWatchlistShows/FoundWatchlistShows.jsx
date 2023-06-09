import React from 'react';
import Cards from '../cards/Cards.jsx';
import './FoundWatchlistShows.scss'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


const FoundWatchlistShows = ({ title , type, mediaType}) => {

  return (
    <div className='container'>
    { title  && <h2>{title}</h2>}
    <div className='all_tiles'>
    
      {
        mediaType.map((item,index) => {
        
          return <Cards key = {index} img={`${IMAGE_BASE_URL}${item.poster_path}`} id = {item.item_id} type = {type} />
        })
      }
    </div>
    </div>
  );
};

export default FoundWatchlistShows;
