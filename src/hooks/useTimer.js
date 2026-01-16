import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (initialTime = 0) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [status, setStatus] = useState('idle'); // idle, running, paused, completed
    const [totalTime, setTotalTime] = useState(initialTime);

    const endTimeRef = useRef(null);
    const rafRef = useRef(null);

    const tick = useCallback(() => {
        if (endTimeRef.current) {
            const now = Date.now();
            const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));

            setTimeLeft(remaining);

            if (remaining <= 0) {
                setStatus('completed');
                cancelAnimationFrame(rafRef.current);
            } else {
                rafRef.current = requestAnimationFrame(tick);
            }
        }
    }, []);

    const start = useCallback(() => {
        if (timeLeft > 0) {
            setStatus('running');
            // Calculate expected end time based on current timeLeft
            endTimeRef.current = Date.now() + timeLeft * 1000;
            rafRef.current = requestAnimationFrame(tick);
        }
    }, [timeLeft, tick]);

    const pause = useCallback(() => {
        if (status === 'running') {
            setStatus('paused');
            cancelAnimationFrame(rafRef.current);
            endTimeRef.current = null;
        }
    }, [status]);

    const reset = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        setStatus('idle');
        setTimeLeft(totalTime);
        endTimeRef.current = null;
    }, [totalTime]);

    const setDuration = useCallback((seconds) => {
        cancelAnimationFrame(rafRef.current);
        setStatus('idle');
        setTotalTime(seconds);
        setTimeLeft(seconds);
        endTimeRef.current = null;
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return {
        timeLeft,
        totalTime,
        status,
        start,
        pause,
        reset,
        setDuration,
    };
};
