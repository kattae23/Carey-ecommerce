import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Router';
import { store } from './store';
import './styles.css';


const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
)
