import React, { useMemo } from 'react';
import { formatTime } from '../utils/timeUtils';

const TimerDisplay = ({ timeLeft, totalTime, status }) => {
    const radius = 140;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset = useMemo(() => {
        if (totalTime === 0) return 0;
        const progress = (totalTime - timeLeft) / totalTime;
        return circumference - (1 - progress) * circumference;
    }, [timeLeft, totalTime, circumference]);

    // Color changes based on status or timeLeft
    const getColor = () => {
        if (status === 'completed') return 'var(--color-success)';
        if (status === 'paused') return 'var(--color-warning)';
        // If time is low (< 10%), turn red
        if (timeLeft / totalTime < 0.1) return 'var(--color-danger)';
        return 'var(--color-brand)';
    }

    return (
        <div className="timer-container">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="progress-ring"
            >
                <circle
                    stroke="var(--color-surface)"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    className="progress-ring__circle"
                    stroke={getColor()}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="time-display">
                {formatTime(timeLeft)}
            </div>
        </div>
    );
};

export default TimerDisplay;
