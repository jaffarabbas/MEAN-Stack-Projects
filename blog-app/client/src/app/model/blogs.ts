import { User } from "./user";

export interface Blog {
    title: string;
    content: string;
    image: string;
    user: User; // Assuming the user ID is stored as a string
}
  