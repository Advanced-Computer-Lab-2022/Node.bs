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
    // console.log({ token, actualType, refreshToken });
    // console.log(req);

    if (type && actualType && type === actualType) {
      // check json web token exists & is verified
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if (err) {
            // console.log('You are not logged in.');
            // res send status 401 you are not logged in
            // console.log(decodedToken);
            jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET,
              (err, decodedRefreshToken) => {
                if (err) {
                  // res.redirect('/unauthorized');
                  console.log('refresh failed');
                  res.status(401).json({ message: 'You are not logged in.' });
                } else {
                  res.cookie('jwt', createToken(actualType));
                  // console.log(decodedRefreshToken);
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
        // res.redirect('/unauthorized');
        console.log('no token found aslan');
        res.status(401).json({ message: 'You are not logged in.' });
      }
    } else {
      console.log(type);
      console.log(actualType);
      console.log('msh hetetak di ya basha');
      // res.redirect('/unauthorized');
      res.status(401).json({ message: 'You are not logged in.' });
    }
  };
};

module.exports = { authMiddleware };
