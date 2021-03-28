export function fioReduction(fio) {
    const fioArray = fio.split(' ');
    return `${fioArray[1].charAt(0)}.${fioArray[2].charAt(0)}. ${fioArray[0]}`
}