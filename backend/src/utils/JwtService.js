const jwt = require("jsonwebtoken")
const jwt_screate = "!@#$%^&*#$%^&*"
class JWTService{

        static generateToken (user){
          const token =  jwt.sign({user},jwt_screate,{
                algorithm:'HS256',
                expiresIn:'1d'
            })
            return token
        }
        static ValidateToken(token){
            const data = jwt.verify(token,jwt_screate)
            return data
        }

}

module.exports = JWTService