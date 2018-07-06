module.exports = function(hour) {
    let dict = {
        am: 'AM',
        pm: 'PM'
    }

    if(hour > 13 ) {
        hour = hour - 12
    }
    let front
    if(hour === 10 ) {
        front = 'AM'
    } else {
        front ='PM'
    }

    return `${hour} ${front} - ${hour + 2} PM`
}