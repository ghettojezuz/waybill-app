export function checkForNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}