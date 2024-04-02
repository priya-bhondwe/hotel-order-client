import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  reverse?: boolean;
}

const Card: React.FC<CardProps> = ({ children, reverse }) => {
  return <div className={`card ${reverse ? "reverse" : ""}`}>{children}</div>;
};

export default Card;
