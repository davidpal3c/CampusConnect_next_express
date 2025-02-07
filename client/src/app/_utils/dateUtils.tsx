export const getTodayDate = () => {
    const DateTime = new Date().toISOString();
    const date = DateTime.split('T')[0];

    return date;
};

export const adjustDateOnlyNumerical = (dateTime: string) => {
    const date = dateTime.split('T')[0];
    return date;    
};

export const adjustDateLetters = (dateFull: string) => {
    const date = new Date(dateFull);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}    