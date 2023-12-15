const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client'); 
const secret = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, secret);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    req.user = user;

    next();
  } catch (error  ) {
    res.status(401).json({ message: 'Не авторизован' });
  }
}

module.exports = {
  auth
}