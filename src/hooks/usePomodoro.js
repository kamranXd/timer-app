import { useState, useCallback, useEffect } from 'react';
import { useTimer } from './useTimer';

export const usePomodoro = () => {
    const [phase, setPhase] = useState('work'); // work, shortBreak, longBreak
    const [cycles, setCycles] = useState(0);

    const WORK_TIME = 25 * 60;
    const SHORT_BREAK = 5 * 60;
    const LONG_BREAK = 15 * 60;

    const timer = useTimer(WORK_TIME);

    const switchPhase = useCallback((nextPhase) => {
        setPhase(nextPhase);
        let time = WORK_TIME;
        if (nextPhase === 'shortBreak') time = SHORT_BREAK;
        if (nextPhase === 'longBreak') time = LONG_BREAK;
        timer.setDuration(time);
    }, [timer]);

    // Auto-switch logic (optional, for now manual or simple)
    // Or check if timer.status === 'completed' then switch?
    useEffect(() => {
        if (timer.status === 'completed') {
            if (phase === 'work') {
                const newCycles = cycles + 1;
                setCycles(newCycles);
                if (newCycles % 4 === 0) {
                    switchPhase('longBreak');
                } else {
                    switchPhase('shortBreak');
                }
            } else {
                switchPhase('work');
            }
            // Optional: Auto-start next phase?
            // timer.start(); 
        }
    }, [timer.status, phase, cycles, switchPhase]);

    return {
        ...timer,
        phase,
        cycles,
        setPomodoroMode: () => {
            setPhase('work');
            setCycles(0);
            timer.setDuration(WORK_TIME);
        }
    };
};
