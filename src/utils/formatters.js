export const formatDate = dateString => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes} ${day}.${month}.${year}`
}

export const formatReplyString = (reply, len) => {
    return reply.length > len + 3 ? `${reply.substring(0, len)}...` : reply;
}

export const colorIsLight = (r, g, b) => {
    let a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return (a < 0.5);
}