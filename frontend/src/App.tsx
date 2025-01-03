import "./index.css";

import { Toaster } from "./components/ui/sonner";
import { useUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser, isLoggedIn } from "./redux/slices/appSlice";
import AllRoutes from "./AllRoutes";

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
      <AllRoutes />
    </>
  );
}

