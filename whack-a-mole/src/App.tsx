/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import mole from './assets/mole.jpeg'
import hole from './assets/hole.jpeg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [level, setLevel] = useState('Easy')
  const [holes, setHoles]  = useState(Array(25).fill(false));
  const [time, setTime] = useState(1000);
  const [timer, setTimer] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);

  const easy = () => {
    setLevel('Easy');
    setTime(1100);
  }
  const medium = () => {
    setLevel('Medium');
    setTime(900);
  }
  const hard = () => {
    setLevel('Hard');
    setTime(700);
  }

  useEffect(()=> {
    let timer: number;
    
    if(isPlaying) {
      timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * holes.length);

      setHoles(() => {
        const newHoles = Array(25).fill(false);
        newHoles[randomIndex] = true;
        return newHoles;
      });
      
      }, time);
    }

    return () => clearInterval(timer);

  }, [isPlaying, time]);

  useEffect(() => {
    if(isPlaying) {
      if (timer > 0) {
        const gameTimer = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(gameTimer);
      }
      else {
        setIsPlaying(false);
        setHoles(Array(25).fill(false))
      }
    }
  }, [timer, isPlaying]);
  
  const cliked = (index : number) => {
    if(holes[index]) {
      setCount((count) => count+1);
      setHoles(holes.fill(false));
    }
  }

  const start = () => {
    setCount(0); 
    setTimer(15); 
    setIsPlaying(true);
  };

  const stop = ()=> {
    setCount(0);
    setTimer(15);
    setIsPlaying(false);
    setHoles(Array(25).fill(false))
  }

  
  return (
    <div className='game-area'>
      <h2>
        Whack A Mole
      </h2>
        {isPlaying ?
          <>
          <button onClick={start}>Restart</button>
          <button onClick={stop}>Exit</button>
          </>
          : <button onClick={start}>Start</button>
          }
        <h3>
          Difficulty: {level}
        </h3>
        <button onClick={easy} > Easy </button>
        <button onClick={medium} > Medium </button>
        <button onClick={hard} > Hard   </button>
        <h3>
          Time Left: {timer}
        </h3>
        <div className='score'>
          Whacked :  {count} 
        </div>
        <div className='grid'>
          {holes.map((value, index)=> 
            <img src={value ? mole : hole} onClick={ () => {cliked(index)}}/>
          )}
        </div>
    </div>
  )
}

export default App
