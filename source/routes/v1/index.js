import express from 'express';

// import authRoute from './auth.routes.js';
import categoryRoute from './category.routes.js';

const router = express.Router();

const defaultRoutes = [
  // {
  //   path: '/auth',
  //   route: authRoute,
  // },
  {
    path: '/category',
    route: categoryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
