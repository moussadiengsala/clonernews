

export default function formatTimestamp(timestamp: number): string {

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeDifference = currentTime - timestamp; // Time difference in seconds

    if (timeDifference < 60) {
        return `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
        const days = Math.floor(timeDifference / 86400);
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
}