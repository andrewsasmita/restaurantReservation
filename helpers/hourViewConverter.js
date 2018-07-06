module.exports = function(hour) {
  return `${hour > 12 ? hour - 12 : hour} ${hour > 12 ? 'PM': 'AM'} - ${(hour + 2) > 12 ? (hour + 2) - 12 : (hour + 2)} ${(hour + 2) > 12 ? 'PM': 'AM'}`
}