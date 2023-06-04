import React from 'react'
import './CastCard.scss'

const CastCard = ({img,original_name,character}) => {
  return (
    <div className='cast-card-out'>
        <img className="cast-card" src={img} alt="cover" />
        <h2>{original_name}</h2>
        <p>as</p>
        <span>{character}</span>
    </div> 
      
  )
}

export default CastCard
