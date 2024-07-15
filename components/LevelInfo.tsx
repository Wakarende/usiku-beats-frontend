import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { FaUnlock } from "react-icons/fa";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import classNames from 'classnames';

const LevelInfo = ({ level, bonusGems, normalDifficulty, multiTapTiles, starsNeeded, achievements, isCurrentLevel }) => {
  return (
    <div className='flex flex-col items-center mb-3'>
    <Card className={classNames('mb-4', { 'border border-primary': isCurrentLevel })}>
      <Card.Body className={classNames('bg-gray-400', { 'bg-blue-200': isCurrentLevel })}>
        <div className="text-center mb-4">
          <h1 className='text-2xl font-bold'>Your Level</h1>
          <h2 className="text-3xl font-bold">  Level {level} {isCurrentLevel && <CheckCircleIcon className="text-green-500 ml-2" />}</h2>
        </div>
        <div className="text-center bg-white p-3">
          <h2 className='font-bold text-xl mb-2'>You Get</h2>
          <div className="flex justify-center items-center mb-2">
            <DiamondIcon className="text-gold text-3xl" />
            <p className='ml-2'>{bonusGems} Bonus Gems</p>
          </div>
          <div className="flex justify-center items-center ml-6 mb-2">
            <FaUnlock className="text-gold text-2xl" />
            <p className='ml-2'>{normalDifficulty} Normal difficulty</p>
          </div>
          <div className="flex justify-center items-center ml-3 mb-2">
            <FaUnlock className="text-gold text-2xl"/>
            <p className="ml-2">{normalDifficulty} Multi-tap tiles</p>
          </div>
        </div>
        <div className='text-center mt-4'>
          <h2 className='text-xl'>Stars needed</h2>
          <div className="flex justify-center items-center">
            <StarIcon className="text-gold text-3xl" />
            <p>{starsNeeded}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
};

export default LevelInfo;