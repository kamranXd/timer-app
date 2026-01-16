import React from 'react';
import { Timer, Brain, Coffee, Dumbbell } from 'lucide-react';

const ModeSelector = ({ currentMode, onSelectMode }) => {
    const modes = [
        { id: 'standard', label: 'Standard', icon: Timer },
        { id: 'pomodoro', label: 'Pomodoro', icon: Brain },
        { id: 'shortBreak', label: 'Short Break', icon: Coffee }, // Quick preset example
    ];

    return (
        <div className="mode-selector">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
                    onClick={() => onSelectMode(mode.id)}
                >
                    <mode.icon size={18} />
                    <span>{mode.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ModeSelector;
