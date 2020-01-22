// Function to get date in dd/mm/yy format
export const getFormattedDate = (input) => {
    let day = String(input).slice(8,10);
    let month = String(input).slice(5,7);
    let year = String(input).slice(0,4);
    return (day + "/" + month + "/" + year);
}
