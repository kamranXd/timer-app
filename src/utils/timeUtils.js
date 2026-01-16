/**
 * Formats seconds into HH:MM:SS or MM:SS
 * @param {number} totalSeconds 
 * @returns {string}
 */
export const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Calculates percentage of time elapsed
 * @param {number} current 
 * @param {number} total 
 * @returns {number}
 */
export const calculateProgress = (current, total) => {
    if (total === 0) return 0;
    return ((total - current) / total) * 100;
};
