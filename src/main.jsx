import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authlayout from "./components/Authlayout.jsx";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Allpost from "./components/pages/Allpost.jsx";
import Addpost from "./components/pages/Addpost.jsx";
import Editpost from "./components/pages/Editpost.jsx";
import Post from "./components/pages/Post.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authentication={false}>
            <Signup />
          </Authlayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Authlayout authentication>
            {" "}
            <Allpost />
          </Authlayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Authlayout authentication>
            {" "}
            <Addpost />
          </Authlayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Authlayout authentication>
            <Editpost />
          </Authlayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
