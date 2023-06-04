import React from 'react'
import { Link } from 'react-router-dom';
import './Cards.scss'

const Cards = ({img,id,type}) => {
  return (
    <Link to={`/${type}/${id}`}>
      <img className="card" src={img} alt="cover" />
    </Link>
  )
}

export default Cards
