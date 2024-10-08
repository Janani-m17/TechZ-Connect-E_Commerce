const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {

    if(!req.header("Authorization"))
        return res.status(401).json({error: "No Token provided, Authorization denied"});
    const token = req.header("Authorization").split(" ")[1];

    if(!token)
        return res.status(401).json({error: "No Token, Authorization denied"});

    try{
        const decoded = jwt.verify(token, "secret_token");
        req.user = decoded;
        console.log("Decoded User:", req.user); // Log the decoded token to debug
        next();
    }
    catch(error){
        res.status(401).json({error: "Token is not valid"})
    }
}

module.exports = auth;

