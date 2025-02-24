export const containsHTML = (content: string) => {
    return /<\/?[a-z][\s\S]*>/.test(content);           
}   

export const stripHTML = (content: string) => {
    return content.replace(/<\/?[a-z][\s\S]*>/g, '');
}