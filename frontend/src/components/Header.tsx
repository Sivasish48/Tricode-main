
import { useSelector } from "react-redux";
import tricodeLogo from "../../public/tricodeLogo.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Profile } from "./Profile";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
  return (
    <div className="flex flex-row justify-between items-center h-16 px-4 bg-black text-white">
      <div className="flex items-center space-x-2">
          <img src={tricodeLogo} alt="Tricode Logo" className="h-14 w-auto" />
        </div>

        {/* Account Creation Button */}

        {isLoggedIn ?<>
        <Profile/>
        </> : <>
        
          <button className="px-4 py-2 text-sm font-semibold border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          onClick={() => navigate("/login")}>
          Create Account
        </button></>}
        
      </div>)
}

export default Header