const jwt = require('jsonwebtoken')
const config = require('../../config')

const verifyAuth = async (req, res, next)=>{
    const token = req.header("authToken")
    if(!token){
        return res.status(401).send('Access denied')
    }
    try {
        const verified = jwt.verify(token,config.SECRET_KEY )
        req.authVerified = verified
        next()
    } catch (error) {
        res.send('Invalid token')
    }
}

module.exports = verifyAuth