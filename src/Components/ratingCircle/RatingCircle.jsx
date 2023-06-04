import React from 'react';
import './RatingCircle.scss';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const RatingCircle = ({ value }) => {
  const circleStyles = {
    pathColor: value < 5 ? "red" : value < 7 ? "orange" : "green",
    trailColor: "transparent",
    strokeLinecap: "round",
  };

  const textStyles = {
    fontSize: "100px",
    fontWeight: "700",
    fill: "black",
  };

  return (
    <div className="circleRating">
        KARTIK
    </div>
  );
};

export default RatingCircle;
