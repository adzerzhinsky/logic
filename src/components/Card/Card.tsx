import React from "react";

interface CardProps {
  name: string;
  image: string;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ name, image, bgColor }) => {

  return (
  <div className="card" >
    <div className="img-wrap" style={{ backgroundColor: bgColor }}>
      <img src={image} alt={name} />
    </div>
    <div className="name">{name}</div>
  </div>
)};

export default Card;
