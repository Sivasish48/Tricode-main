import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./Pages/Home"));
const Compiler = lazy(() => import("./Pages/Compiler"));
const Landing = lazy(() => import("./Pages/Landing"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const AllCodes = lazy(() => import("./Pages/AllCodes"));
const MySavedCodes = lazy(() => import("./Pages/MySavedCodes"));
function AllRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/compiler/:urlId" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/all-codes" element={<AllCodes />} />
        <Route path="/my-saved-codes" element={<MySavedCodes />} />
      </Routes>
    </Suspense>
  );
}

export default AllRoutes;
