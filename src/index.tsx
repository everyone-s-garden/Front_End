import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Nav from './components/Nav';
import Main from './pages/Main/Main';
import Map from './pages/Map/Map';
import Login from './pages/Login/Login';
import Mypage from 'pages/My/My';
import Token from 'pages/Login/Kakao/token/token';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/map',
        element: <Map />,
      },
      {
        path: '/my',
        element: <Mypage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/my/oauth/kakao',
        element: <Token />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <NavermapsProvider ncpClientId="jij6pc5oav">
    <GoogleOAuthProvider clientId="999513273898-9fa6iu0cm3jbeancg8f82mjs53trr355.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </NavermapsProvider>,
);
