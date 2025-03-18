'use client';
import React, { useState } from 'react';
import Circle from './Circle';
import { winningCombinations } from './Logic'; 

const Board = () => {
  const [circleColors, setCircleColors] = useState(Array(16).fill('white'));
  const [player1, setPlayer1] = useState(false);
  const [p1, setP1] = useState([]); 
  const [p2, setP2] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); 

  const checkWinner = (playerArray) => {
    return winningCombinations.some(combination =>
      combination.every(index => playerArray.includes(index))
    );
  };

  const handleClick = (id) => {
    if (gameOver || circleColors[id] !== 'white') return; 

    const newColors = [...circleColors];
    let newP1 = [...p1];
    let newP2 = [...p2];

    if (!player1) {
      newColors[id] = 'red';
      newP1.push(id);
      if (checkWinner(newP1)) {
        setWinner('Player 1');
        setGameOver(true); 
      }
      setP1(newP1);
      setPlayer1(true);
    } else {
      newColors[id] = 'blue';
      newP2.push(id);
      if (checkWinner(newP2)) {
        setWinner('Player 2');
        setGameOver(true); 
      }
      setP2(newP2);
      setPlayer1(false);
    }

    setCircleColors(newColors);

  
    if (!winner && newColors.every(color => color !== 'white')) {
      setWinner('Draw');
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCircleColors(Array(16).fill('white'));
    setPlayer1(false);
    setP1([]);
    setP2([]);
    setGameOver(false);
    setWinner(null);
  };

  const renderCircles = () => {
    return Array.from({ length: 16 }).map((_, index) => (
      <Circle
        key={index}
        onClick={() => handleClick(index)}
        className='circles'
        id={index}
        currentColor={circleColors[index]}
      />
    ));
  };

  return (
    <div className='gameB'>
      <div className='status'>
        {winner ? <h2>{winner === 'Draw' ? 'Draw!' : `${winner} wins!`}</h2> : <h2>Turn: {player1 ? 'Player 2' : 'Player 1'}</h2>}
      </div>
      <div className='container'>
        {renderCircles()}
      </div>
      <button onClick={resetGame} className='reset-button'>Reset</button>
    </div>
  );
};

export default Board;
