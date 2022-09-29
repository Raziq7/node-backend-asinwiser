import jwt from 'jsonwebtoken';

export default (req, res, next) =>{
  const token = req.headers["authorization"] || req.headers["x-access-token"]
  // console.log(token,"tokentokentoken");
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_AUTH_TOKEN, (err, user) => {
      // console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
    // console.log(user,"user Successsssssss");

      next()
    })
}