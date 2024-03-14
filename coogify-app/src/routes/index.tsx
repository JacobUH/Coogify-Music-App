import { RouteObject } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Home } from '../pages/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [{ children: [{ path: '', element: <Home /> }] }],
  },
];

export default routes;
