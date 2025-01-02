import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentLanguage,
  updateFullCode,
} from "../redux/slices/CompilerSlice";
import { RootState } from "../redux/store";
import { compilerSliceStateType } from "../redux/slices/CompilerSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Code, Copy, ShareIcon, SaveIcon } from "lucide-react";
import LoadingLad from "../loader/loader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSaveCodeMutation, useLoadCodeMutation } from "../redux/slices/api";
import { showToast } from "../lib/error/handleError";
function CodeHeader() {
  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const [loadCode] = useLoadCodeMutation();
  const { urlId } = useParams();

  const navigate = useNavigate();

  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  console.log("Full Code: ", fullCode);

  const handleSave = async () => {
    try {
      console.log("Saving Full Code: ", fullCode);

      const response = await saveCode(fullCode).unwrap();

      console.log("Save Response: ", response);

      if (response.url) {
        navigate(`/compiler/${response.url}`, { replace: true });
        showToast.success("Code saved successfully");
      }
    } catch (error) {
      console.error("Error saving code: ", error);

      showToast.error("Error saving code due to missing data");
    }
  };

  const loadTheCode = async () => {
    try {
      if (urlId) {
        const response = await loadCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
        console.log("Response: ", response.fullCode);
      }
    } catch (error) {
      console.log("error is " + error);
      showToast.error("Error loading code ");
    }
  };

  useEffect(() => {
    if (urlId) {
      loadTheCode();
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-end items-center ">
        <LoadingLad />
      </div>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-transparent text-white shadow-md">
      {/* Buttons and Dropdown at the End */}
      <div className="flex items-center gap-4">
        {/* Choose Language Dropdown */}
        <div className="flex items-center">
          <label htmlFor="language" className="mr-2">
            Choose Language:
          </label>
          <Select
            defaultValue={currentLanguage}
            onValueChange={(value) => {
              dispatch(
                updateCurrentLanguage(
                  value as compilerSliceStateType["currentLanguage"]
                )
              );
            }}
          >
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent className="bg-dark text-white">
              <SelectItem
                value="html"
                className="bg-dark text-white hover:bg-dark/90 focus:bg-white"
              >
                HTML
              </SelectItem>
              <SelectItem
                value="css"
                className="bg-dark text-white hover:bg-dark/90 focus:bg-white"
              >
                CSS
              </SelectItem>
              <SelectItem
                value="javascript"
                className="bg-dark text-white hover:bg-dark/90 focus:bg-white"
              >
                JAVASCRIPT
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          variant="ghost"
          className="flex items-center gap-2 px-4 py-2 border border-white rounded-full hover:border-none hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:text-black transition-all duration-300 transform hover:scale-110"
        >
          <SaveIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Save</span>
        </Button>

        {/* Share Button */}
        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 px-4 py-2 border border-white rounded-full hover:border-none hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:text-black transition-all duration-300 transform hover:scale-110">
            <ShareIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black text-white border border-gray-700 rounded-lg shadow-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center justify-center text-purple-500">
                <Code className="mr-2" />
                Share Your Code!
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div className="flex items-center gap-2 mt-4">
                {/* Share URL Input */}
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-500 focus:outline-none"
                />
                {/* Copy to Clipboard Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast.success("URL has been copied to clipboard!");
                  }}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="px-4 py-2 rounded bg-gray-800 hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 transform hover:scale-110">
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}

export default CodeHeader;
