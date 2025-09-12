export function timeAgo(dateString: string): string {
    let formattedDate = formatDate(dateString);
    let date = new Date(formattedDate)
    let now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;
    const secondsInMonth = 2629800; // 平均すると1ヶ月は約30.44日
    const secondsInYear = 31557600; // 閏年を含む1年の平均秒数

    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds}秒前`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes}分前`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours}時間前`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days}日前`;
    } else if (diffInSeconds < secondsInMonth) {
        const weeks = Math.floor(diffInSeconds / secondsInWeek);
        return `${weeks}週間前`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        return `${months}ヶ月前`;
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        return `${years}年前`;
    }
}

export function whenTimeAgo(dateString: string): string {
    let formattedDate = formatDate(dateString);
    let date = new Date(formattedDate)
    let now = new Date();
    let diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;
    const secondsInMonth = 2629800; // 平均すると1ヶ月は約30.44日
    const secondsInYear = 31557600; // 閏年を含む1年の平均秒数

    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds}秒前`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes}分前`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours}時間前`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days}日前`;
    } else if (diffInSeconds < secondsInMonth) {
        const weeks = Math.floor(diffInSeconds / secondsInWeek);
        return `${weeks}週間前`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        return `${months}ヶ月前`;
    } else {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
}

function formatDate(dateString: string): string {
    // ISO 8601 format: "2025-09-12T16:33:47Z"
    if (dateString.includes('T')) {
        const [datePart, timePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-").map(part => parseInt(part));
        const timeWithoutZ = timePart.replace('Z', '');
        const [hour, minute, second] = timeWithoutZ.split(":").map(part => parseInt(part));
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
    
    // Fallback for space-separated format
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(part => parseInt(part));
    const [hour, minute, second] = timePart.split(":").map(part => parseInt(part));
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}