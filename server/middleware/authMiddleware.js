const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === "OPTION") {
    next()
  }
  try {
    const token = req.headers.authorzation.split(' ')[1] // Bearer asfasnfkajsfnjk
    if  (!token) {
      return res.status(401).json({messge: "Не авторизован"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
      req.user = decoded
      next()
  } catch (e) {
    res.status(401).json({messge: "Не авторизован"})
  }
}