const jwt = require('jsonwebtoken')
const jwt_secret = "anshu"

const fetchuser = (req, res, next) => {

  const token = req.header('auth-token')

  if(!token){
    res.status(401).json({error: "Enter valid token"})
  }

  try {

    const data = jwt.verify(token, jwt_secret)
    console.log(data,"<--jaadoo");
    
    req.id = data.id
    next()
    
  } catch (err) {

    console.log("errr", err);
    res.status(401).json({success: false, error: "enter valid token"})

  }
  
}


module.exports = fetchuser;
