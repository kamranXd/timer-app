import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Controls = ({ status, start, pause, reset }) => {
    return (
        <div className="controls">
            {status === 'running' ? (
                <button className="btn-control primary" onClick={pause} aria-label="Pause Timer">
                    <Pause size={32} />
                </button>
            ) : (
                <button className="btn-control primary" onClick={start} aria-label="Start Timer">
                    <Play size={32} fill="currentColor" />
                </button>
            )}

            <button className="btn-control" onClick={reset} aria-label="Reset Timer">
                <RotateCcw size={28} />
            </button>
        </div>
    );
};

export default Controls;
