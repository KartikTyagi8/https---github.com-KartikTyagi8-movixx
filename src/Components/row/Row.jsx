import React from 'react'
import './Row.scss'
import Cards from '../cards/Cards';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
// const IMAGE_BACK_DROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const Row = ({title,type,arr}) => {
return (
    <div className="row">
      <h2>{title}</h2>
      <div> 
        {arr?.map((item,index) => (
          <Cards key = {index} img={`${IMAGE_BASE_URL}${item.poster_path}`} id = {item.id} type = {type} />
        ))}
      </div>
    </div>
  )};

export default Row
