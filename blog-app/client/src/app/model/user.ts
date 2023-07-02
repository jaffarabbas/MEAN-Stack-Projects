import { Blog } from "./blogs";

export interface User {
    name: string;
    email: string;
    password: string;
    tc: boolean;
    blogs: Blog[]; // Assuming the blog IDs are stored as an array of strings
}