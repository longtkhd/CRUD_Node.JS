const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
exports.auth = async (req, res, next) => {
  const payload = req.headers['x-access-token']
  try {
    const token = jwt.verify(payload, 'abc')
    const user = await User.findOne({ _id: token.id, token: payload })
    if (!user) {
      throw new Error('Authorization Failed')
    }
    // const role = await Role.findById(user.role)
    // if (role && role.name !== 'admin') {
    //   throw new Error('Authorization Failed')
    // }
    next()
  } catch (e) {
    res.status(401).send({ message: e.message })
  }
}
