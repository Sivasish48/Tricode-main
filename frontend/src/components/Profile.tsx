import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet"; // Corrected imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

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
        <Button className="border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-black">
          Profile
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] bg-black text-white">
        <div className="text-white">
          <h2 className="text-xl font-semibold">
            Check out your saved codes or logout
          </h2>
        </div>
        <div className="flex flex-col gap-4 py-4"></div>
        <div className="flex flex-col gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-black w-full">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className=" bg-black text-white border-none">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gradient-to-r from-purple-500 to-pink-500 text-black border-none">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} className=" text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-black border-none">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <SheetClose asChild>
            <Button className="border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-black w-full">
              Saved Codes
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
