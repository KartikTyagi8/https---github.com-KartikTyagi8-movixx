import React from "react";
import Cards from "../cards/Cards";
import './RelatedSection.scss'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const RelatedSection = ({ type, recommend }) => {
  return (
    <div className="all_tiles">
      <h2>Recommended Shows</h2>
      <div> 
        {recommend?.map((item,index) => (
          <Cards key = {index} img={`${IMAGE_BASE_URL}${item.poster_path}`} id = {item.id} type = {type} new_page = {true} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSection;
