export function convertDate(dateString) {
    const date = new Date(dateString);
    const dayTmp = date.getDate();
    const monthTmp = date.getMonth() + 1;
    const day = dayTmp < 10 ? `0${dayTmp}` : dayTmp;
    const month = monthTmp < 10 ? `0${monthTmp}` : monthTmp;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`
}