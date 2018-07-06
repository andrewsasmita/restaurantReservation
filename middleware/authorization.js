module.exports = function(req, res, next) {
  if (req.session && req.session.customer) {
    if (req.session.customer.role === 'admin') {
      next()
    }
    else {
      next('You are not authorized to view this page')
    }
  } else {
    next('You have to log in first')
  }
}