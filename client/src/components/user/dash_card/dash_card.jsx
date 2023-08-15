import React from "react";

import './dash_card.css';

const Card = ({ href, imgSrc, cardText, bgColor }) => {
  const cardStyle = {
    backgroundColor: bgColor || getRandomColor(),
    width: '18rem',
    transition: 'transform 0.2s',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    margin: '5px'
  };

  return (
    <a href={href}>
      <div className="card mb-4" style={{ ...cardStyle }}>
        <img src={imgSrc} className="card-img-top img-fluid" alt=".." />
        <div className="card-body">
          <p className="card-text text-center">{cardText}</p>
        </div>
      </div>
    </a>
  );
};

const getRandomColor = () => {
  const colors = [
    '#FF5733', '#33FF77', '#3366FF', '#FF33CC', '#FFFF33',
    '#FF9900', '#00CC99', '#9933FF', '#FF6633', '#00CCFF',
    '#FF3366', '#66FF33', '#FF66CC', '#FFCC00', '#33FFCC',
    '#9966FF', '#FF6666', '#66CCFF', '#FFCC33', '#33CCFF',
    '#CC33FF', '#FF3366', '#66FF66', '#FF99CC', '#FF6600',
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export default Card;
