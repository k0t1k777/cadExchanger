import React from 'react';
import './Icon.scss';
import Icons from './icons/sprite.svg';

interface IconProps {
  id: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ id, className = 'svg' }) => {
  return (
    <svg className={className}>
      <use href={`${Icons}#${id}`}></use>
    </svg>
  );
};
