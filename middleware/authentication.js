module.exports = function(req, res, next) {
  if (req.session && req.session.customer) {
    next()
  }
  else {
    res.redirect('/login')
  }
}