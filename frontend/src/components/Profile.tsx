import { Button } from "../components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet"; // Corrected imports
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "../redux/slices/api";
import { useDispatch } from "react-redux";
import { currentUser, isLoggedIn } from "../redux/slices/appSlice";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(currentUser({}));
    dispatch(isLoggedIn(false));
    navigate("/");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Profile
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] bg-black text-white">
        <div className="text-white">
          <h2 className="text-xl font-semibold">
            Check out your codes or logout
          </h2>
        </div>
        <div className="flex flex-col gap-4 py-4"></div>
        <div className="flex flex-col gap-4">
          <SheetClose asChild>
            <Button onClick={handleLogout} className="border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full">
              Saved Codes
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
