

import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import ErrorPage from './ErrorPage';

export const router = createBrowserRouter([
    {
        path: "*",
        element: <AppRouter />,
        errorElement: <ErrorPage />
    },
]);

export const Router = () => {
    return
}
