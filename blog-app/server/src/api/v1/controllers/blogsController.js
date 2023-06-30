import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import UserModel from "../models/User.js";

export const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await Blog.find();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    if(!blogs) {
        res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({blogs});
}

//get by id
export const getById = async (req, res) => {
    let blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(blogId);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!blog){
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({blog});
}

export const add = async (req, res) => {
    let {title, content, image, user} = req.body;
    let existingUser;
    try{
        existingUser = await UserModel.findById(user);
        console.log(existingUser);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!existingUser){
        return res.status(404).json({ message: "User not found" });
    }
    const blog = new Blog({
        title,
        content,
        image,
        user,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({blog});
}

//update
export const update = async (req, res) => {
    let blogId = req.params.id;
    let {title, content, image, user} = req.body;
    let blog;
    blog = await Blog.findByIdAndUpdate(blogId, {
        title,
        content,
        image,
        user,
    });
    try{
        await blog.save();
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!blog){
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(201).json({blog});
}


//delete
export const deleteBlog = async (req, res) => {
    let blogId = req.params.id;
    let blog;
    try{
        console.log(blogId);
        blog = await Blog.findByIdAndDelete(blogId).populate("user");
        console.log(blog);
        await blog.user.blogs.pull(blog);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!blog){
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({"message": "Blog deleted successfully"});
}

//get by user id
export const getBlogsByUserId = async (req, res) => {
    let userId = req.params.id;
    let user;
    try{
        user = await UserModel.findById(userId).populate("blogs");
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({blogs: user});
}