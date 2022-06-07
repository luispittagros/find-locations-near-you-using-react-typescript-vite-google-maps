import { useRoutes, Navigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import Home from '@/views/Home';

const Routes = () => {
  return useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '*',
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);
};

export default Routes;
