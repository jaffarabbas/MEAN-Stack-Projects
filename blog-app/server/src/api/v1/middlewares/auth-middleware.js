import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

var checkToken = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try{
            token = authorization.split(" ")[1];
            const { id } = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await UserModel.findById(id).select("-password");  
            next();
        }catch(err){
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default checkToken;