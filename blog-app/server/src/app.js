import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import routeConfig from './config/routeConfig.js';
dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//CORS 
app.use(cors());
// Connect to database
connectDB(DATABASE_URL);
//JSON
app.use(express.json());

//routes confriguation
const version = process.env.VERSION;
const selectedVersion = routeConfig.find(config => config.version === version);

//confriguation for routes according to version
if (selectedVersion) {
    console.log(`Using ${selectedVersion.version} routes`);
    selectedVersion.routes.forEach(route => {
      const router = route.router; 
      app.use(route.path, router);
    });
} else {
    throw new Error('Invalid API version');
}

//starting server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

