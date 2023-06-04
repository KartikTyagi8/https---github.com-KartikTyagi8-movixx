import React from 'react';
import Cards from '../cards/Cards.jsx';
import './FoundShows.scss'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


const FoundShows = ({ title , type, mediaType}) => {
  // if (!Array.isArray(mediaType)) {
  //   return null; // or handle the case when mediaType is not an array
  // }
  console.log(title);

  return (
    <div className='container'>
    { title  && <h2>{title}</h2>}
    <div className='all_tiles'>
    
      {
        mediaType.map((item,index) => {
        
          return <Cards key = {index} img={`${IMAGE_BASE_URL}${item.poster_path}`} id = {item.id} type = {type} />
        })
      }
    </div>
    </div>
  );
};

export default FoundShows;
