import  { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
  const [textColor, setTextColor] = useState(getRandomColor());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());

      if (time.getSeconds() % 10 === 0) {
        setBackgroundColor(getRandomColor());
        setTextColor(getRandomColor());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const clockStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    padding: '20px',
    fontSize: '2em',
    textAlign: 'center',
    margin: '50px',
    borderRadius: '5px',
    display: 'inline-block',
    animation: 'fadeInOut 1s infinite',
  };

  return (
    <div style={clockStyle}>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;
