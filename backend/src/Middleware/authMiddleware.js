const jwt = require('jsonwebtoken');

const createToken = (name) => {
  return jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: '50m',
  });
};
const authMiddleware = (type) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;
    const actualType = req.cookies.type;
    const refreshToken = req.cookies.refresh;

    if (type && actualType && type === actualType) {
      // check json web token exists & is verified
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if (err) {
            // console.log('You are not logged in.');
            // res send status 401 you are not logged in

            jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET,
              (err, decodedRefreshToken) => {
                if (err) {
                  res.redirect('/unauthorized');
                  res.status(401).json({ message: 'You are not logged in.' });
                } else {
                  res.cookie('jwt', createToken(decodedToken.name));
                  console.log(decodedRefreshToken);
                  next();
                }
              }
            );
            // res.redirect('/login');
          } else {
            console.log(decodedToken);
            next();
          }
        });
      } else {
        res.redirect('/unauthorized');
        res.status(401).json({ message: 'You are not logged in.' });
      }
    } else {
      res.redirect('/unauthorized');
      res.status(401).json({ message: 'You are not logged in.' });
    }
  };
};

module.exports = { authMiddleware };
