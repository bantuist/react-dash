import React from 'react';
import styled from 'styled-components';
import TimeField from 'react-simple-timefield';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  form .row {
    // margin-top: -20px;
  }
`;
  
const Time = styled(TimeField)`
  font-family: inherit;
  width: 100% !important;
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 12em;
  font-weight: 500;
  background: transparent;
  color: ${({ theme}) => theme.white };
  border: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin: 0 auto !important;
`;

const Timer = ({ 
  time, 
  active, 
  id, 
  onSetTimer, 
  onResetTimer, 
  onUpdateTimer 
}) => {
  const onTimeChange = time => onSetTimer(time);

  const handleSubmit = event => {
    event.preventDefault();
    const seconds = secondsLeft(time);
    startTimer(seconds);
  };

  // Convert to seconds for countdown interval
  const secondsLeft = time => {
    time = time.split(':').map(Number);
    const [ hours, minutes, seconds ] = time;
    return (hours * 60 * 60) + (minutes * 60) + seconds;
  };

  // Convert back to time string to display
  const timeLeft = totalSeconds => {
    if (!totalSeconds) {
      clearInterval(this.timer);
      this.stopTimer();
    }

    let hours = Math.floor(totalSeconds / 60 / 60); 
    let minutes = Math.floor(totalSeconds / 60 % 60);
    let seconds = totalSeconds % 60;

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  const startTimer = (totalSeconds) => {
    if (!totalSeconds) return;

    const start = Date.now();

    this.timer = setInterval(() => {
      const id = this.timer;

      // Change in milliseconds
      const delta = Date.now() - start;

      // Seconds
      const elapsed = Math.floor(delta / 1000);
      const remaining = totalSeconds - elapsed;
      console.log(timeLeft(remaining));

      onUpdateTimer(
        timeLeft(remaining),
        remaining,
        id
      );
    }, 1000);
  };

  const stopTimer = () => {
    console.log('stop', id);
    clearInterval(id);
    onResetTimer();
  }; 

  return (
    <Container>
      <form onSubmit={event => handleSubmit(event)}>
        <Time 
          value={time} 
          showSeconds
          onChange={onTimeChange}
          disabled={active} 
        />
        <div className="one column centered row">
          <div className="column">
            {!active && <Button className="ui mini green button" type="submit">Start</Button>}
            {active && <Button className="ui mini red button" onClick={stopTimer}>Stop</Button>}
          </div>
        </div>
      </form>
    </Container>
  );
}

export default Timer;