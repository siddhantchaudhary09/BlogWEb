import { useDispatch } from "react-redux";
import authService from "./Appwrite/Authservice";
import { login, logout } from "./Store/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { Header, Footer } from "./components/exports";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentuser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  return !loading ? (
    <div className="h-full flex bg-gray-500 sm:w-full ">
      <div className="h-full flex flex-col bg-gray-500 w-full">
        <Header />
        <main className="flex-grow">{<Outlet />}</main>
        <Footer className="" />
      </div>
    </div>
  ) : null;
}

export default App;
