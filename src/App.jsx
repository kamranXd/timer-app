import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useTimer } from './hooks/useTimer';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import ThemeToggle from './components/ThemeToggle';
import { playAlarm } from './utils/soundUtils';
import './styles/index.css';

function App() {
  const [mode, setMode] = React.useState('standard');
  const { timeLeft, totalTime, status, start, pause, reset, setDuration } = useTimer(25 * 60);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'standard') setDuration(10 * 60);
    if (newMode === 'pomodoro') setDuration(25 * 60);
    if (newMode === 'shortBreak') setDuration(5 * 60);
  };

  // Completion effects & Pomodoro logic
  useEffect(() => {
    if (status === 'completed') {
      playAlarm();
      const randomColor = () => ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)];
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [randomColor(), randomColor()]
      });

      // Pomodoro Auto-switch
      if (mode === 'pomodoro') {
        const isWork = totalTime === 25 * 60;
        // Wait a few seconds then switch?? Or just ready the timer?
        // For now, let's just leave it completed until user resets or switches. 
        // Or better: Notify user "Break Time!"
      }
    }
  }, [status, mode, totalTime]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        if (status === 'running') pause();
        else start();
      }
      if (e.code === 'KeyR') reset();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, start, pause, reset]);

  return (
    <div className="app-container">
      <ThemeToggle />

      <header className="app-header">
        Adv. Timer
      </header>

      <ModeSelector currentMode={mode} onSelectMode={handleModeChange} />

      <TimerDisplay
        timeLeft={timeLeft}
        totalTime={totalTime}
        status={status}
      />

      <Controls
        status={status}
        start={start}
        pause={pause}
        reset={reset}
      />
    </div>
  );
}

export default App;
