import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { PageNotFound } from '../components/PageNotFound/PageNotFound';
import { Dashboard } from '../components/Dashboard/Dashboard';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: '*',
        element: <PageNotFound />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];

export const router = createBrowserRouter(routes);
