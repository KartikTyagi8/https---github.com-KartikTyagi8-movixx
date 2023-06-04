import React from 'react'
// import axios from 'axios';
import './Cast.scss'
import CastCard from '../castCard/CastCard';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";



const Cast = ({cast}) => {
  const filteredData = cast.filter(item => item.known_for_department === 'Acting');
  return (
    <div className="cast">
      <h2>Cast</h2>
      <div> 
        {filteredData?.map((item,index) => (
          <CastCard key = {index} img={`${IMAGE_BASE_URL}${item.profile_path}`} original_name={item.original_name}
          character={item.character}/>
        ))}
      </div>
    </div>
  )
  };


export default Cast
