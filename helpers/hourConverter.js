module.exports = function(hour) {
    let dict = {
        am: 'AM',
        pm: 'PM'
    }
    let prefix

    return `${hour} ${hour < 11 ? dict.am : dict.pm} - ${hour + 2} PM`
}