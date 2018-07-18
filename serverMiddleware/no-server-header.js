module.exports = (req, res, next) => {
  res.removeHeader('Server')
  next()
}
