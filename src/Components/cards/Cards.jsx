import React from 'react'
import {useNavigate} from 'react-router-dom';
import './Cards.scss'

const Cards = ({img,id,type,new_page=false}) => {
  const navigate = useNavigate();
  const clickCard = () => {
    navigate(`/${type}/${id}`);
    // const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    // if (newWindow) newWindow.opener = null;
  }
  const clickCardNewPage = () => {
    const newWindow = window.open(`/${type}/${id}`, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  return new_page ? (
    <img className="card" src={img} alt="cover" onClick={clickCardNewPage} target="_blank" rel="noopener noreferrer" />
  ) : <img className="card" src={img} alt="cover" onClick={clickCard}/>
}

export default Cards
