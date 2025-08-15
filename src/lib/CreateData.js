

export function convertDate(dates){
const date = new Date(dates);

const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
const year = date.getFullYear();
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const formatted = `${day} ${month} ${year} ${hours}:${minutes}`;
return formatted;
}