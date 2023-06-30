import userRoutes from '../api/v1/routes/userRoutes.js';
import blogRoutes from '../api/v1/routes/blogRoutes.js';

const routeConfig = [
  {
    version: 'v1',
    routes: [
      { path: '/blogs-app/v1/api/user', router: userRoutes },
      { path: '/blogs-app/v1/api/blogs', router: blogRoutes },
    ]
  },
];

export default routeConfig;
