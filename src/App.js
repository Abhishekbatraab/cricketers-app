import React from "react";
import ReactDOM from 'react-dom/client';
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Cricketers from "./components/Cricketers/Cricketers";
import Cricketer from "./components/Cricketer/Cricketer";

const App = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

const appRouter = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            path: '/',
            element: <Cricketers />
        },
        {
            path: '/cricketer/:cricketerId',
            element: <Cricketer />
        }
    ],
    errorElement: <Error />
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)
