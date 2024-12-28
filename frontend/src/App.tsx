import "./index.css";
// import Header from './components/Header';
import Home from "./Pages/Home";
import Compiler from "./Pages/Compiler";
import NotFound from "./Pages/NotFound";
import Landing from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Toaster } from "./components/ui/sonner";
import { useUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser, isLoggedIn } from "./redux/slices/appSlice";

export default function App() {
  const { data, error } = useUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const userInfo: UserInfoInterface = {
        userId: data.userId, 
        username: data.username,
        email: data.email,
        savedCodes: data.savedCodes,
      };
      dispatch(currentUser(userInfo));
      console.log("data:", data);
      dispatch(isLoggedIn(true));
    } else if (error) {
      const emptyUserInfo: UserInfoInterface = {
        userId: false, 
        username: "",
        email: "",
        savedCodes: [],
      };
      dispatch(currentUser(emptyUserInfo)); 
      dispatch(isLoggedIn(false));
    }
  }, [data, error]);
  
  
  return (
    <>
      {/* {location.pathname !== '/' && <Header />} */}
      <Toaster position="bottom-right" theme="dark" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/compiler/:urlId" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

