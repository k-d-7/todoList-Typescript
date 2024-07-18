export function isEmpty(value: any): boolean {
    return value === undefined || value === null || value === "";
}

export function isFormatDate(value: string): boolean {
    //date in format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!value.match(regex)) {
        return false;
    }

    const date = new Date(value);
    const [year, month, day] = value.split("-").map(Number);

    return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
    );
}
