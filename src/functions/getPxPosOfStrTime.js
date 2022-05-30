// import formatDate from '../functions/formatDate'

function getPxPosOfStrTime(start_time, duration = 0) {
    const firstPx = 46
    const eachPxPerIdx = 60
    let containerDayTime = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    let containerNightTime = [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6]
        // let startPx = 48
        // console.log(start_time);
    let splitterDate = `${start_time}`.split('.')[0].split('T').join(' ')
        // console.log(splitterDate);
    let hour = new Date(splitterDate).getHours()
    let minutes = new Date(splitterDate).getMinutes()
        // console.log(hour);
    let startIdx = containerDayTime.indexOf(hour) == -1 ? containerNightTime.indexOf(hour) + containerDayTime.length + 1 : containerDayTime.indexOf(hour)
    let calculate = startIdx * eachPxPerIdx + firstPx + minutes + duration
        // console.log(startIdx);
        // console.log(calculate);
    return calculate
}

export default getPxPosOfStrTime