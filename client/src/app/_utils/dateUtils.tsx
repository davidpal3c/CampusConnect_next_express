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
    const dateOnly = dateFull.split('T')[0]; // Extract just "YYYY-MM-DD"


    const date = new Date(dateOnly);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate() + 1;
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}    

// format date to "MM/DD/YYYY" (without the time)
export const formatToDateOnly = (isoString: string) => {
    return isoString ? isoString.split("T")[0] : getTodayDate();    
}
