import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../../../config/emailConfig.js";

class UserController{
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation,tc } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        const newUser = new UserModel({
                            name:name,
                            email:email,
                            password: hashedPassword,
                            tc:tc,
                            blogs: [],
                        });
                        await newUser.save();
                        const user = await UserModel.findOne({ email: email });
                        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                        return res.status(201).json({ message: "User created successfully", token: token });
                    }catch(err){
                        return res.status(400).json({ message: err });
                    }
                }else{
                    return res.status(400).json({ message: "Passwords do not match" });
                }
            }else{
                return res.status(400).json({ message: "All fields are required" });
            }
        }
    }

    static userLogin = async (req, res) => {
        const {email, password} = req.body;
        if(email && password){
            const user = await UserModel.findOne({ email: email });
            if(user != null){
                const isMatch = await bcrypt.compare(password, user.password);
                if((user.email === email) && isMatch){
                    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                    return res.status(200).json({ message: "User logged in successfully", token: token});
                }else{
                    return res.status(400).json({ message: "Invalid credentials" });
                }
            }else{
                return res.status(400).json({ message: "User does not exist" });
            }
        }else{
            return res.status(400).json({ message: "All fields are required" });
        }
    }

    static changeUserPassword = async (req, res) => {
        let { password, password_confirmation } = req.body;
        if(password && password_confirmation){
            if(password !== password_confirmation){
                return res.status(400).json({ message: "Passwords do not match" });
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                await UserModel.findByIdAndUpdate(req.user._id, {$set: {password: hashedPassword}});
                return res.status(200).json({ message: "Password changed successfully" });
            }
        }else{
            return res.status(400).json({ message: "All fields are required" });
        }
    }

    static loggedInUser = async (req, res) => {
        return res.status(200).json({ user: req.user });
    }

    static sendUserPasswordEmail = async (req, res) => {
        const {email} = req.body;
        if(email){
            const user  = await UserModel.findOne({email: email});
            if(user){
                const secret = user._id + process.env.SECRET_KEY;
                const token = jwt.sign({id: user._id}, secret, {expiresIn: "15m"});
                const link = `http://localhost:3000/api/user/reset-password/${user._id}/${token}`;
                //email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "Password Reset",
                    html: `<h2>Please click on the given link to reset your password</h2><br><a href=${link}>Click Here</a>`
                });
                return res.status(200).json({ message: "Password reset link sent to your email", info: info });
            }else{
                return res.status(400).json({ message: "User does not exist" });
            }
        }else{
            return res.status(400).json({ message: "Email is required" });
        }
    }

    static userPasswordReset = async (req, res) => {
        const {password , password_confirmation} = req.body;
        const {id, token} = req.params;
        const user = await UserModel.findById(id);
        const secret = user._id + process.env.SECRET_KEY;
        try{
            jwt.verify(token, secret);
            if(password && password_confirmation){
                if(password !== password_confirmation){
                    return res.status(400).json({ message: "Passwords do not match" });
                }else{
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    await UserModel.findByIdAndUpdate(id, {$set: {password: hashedPassword}});
                    return res.status(200).json({ message: "Password changed successfully" });
                }
            }else{
                return res.status(400).json({ message: "All fields are required" });
            }
        }catch(err){
            return res.status(400).json({ message: "Invalid user" });
        }
    }
}

export default UserController;