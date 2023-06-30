import express from "express";
import { add, deleteBlog, getAllBlogs, getBlogsByUserId, getById, update } from "../controllers/blogsController.js";
import checkToken from "../middlewares/auth-middleware.js";

const blogRouter = express.Router();

//private
blogRouter.get("/", checkToken,getAllBlogs);
blogRouter.post("/add", checkToken , add);
blogRouter.put("/update/:id", checkToken ,update);
blogRouter.get("/:id", checkToken ,getById);
blogRouter.delete("/:id", checkToken ,deleteBlog);
blogRouter.get("/user/:id", checkToken ,getBlogsByUserId);

export default blogRouter;