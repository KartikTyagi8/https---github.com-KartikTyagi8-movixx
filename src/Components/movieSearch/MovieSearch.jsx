import React from 'react'
import './MovieSearch.scss'
import { Link } from 'react-router-dom'

const MovieSearch = ({name,id,clearSearch}) => {
    const handleClick = () => {
        // Call the clearSearch function passed from the Header component
        clearSearch();
        
      };
  return (
    <Link to={`/movie/${id}`}>
        <div className='movie-search' onClick={handleClick}>{name}</div>
    </Link>
    
  )
}

export default MovieSearch
