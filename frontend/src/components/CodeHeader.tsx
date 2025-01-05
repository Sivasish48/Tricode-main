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
import { Code, Copy, ShareIcon, SaveIcon, MonitorDown } from "lucide-react";
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
import { useSaveCodeMutation, useLoadCodeMutation } from "../redux/slices/api";
import { showToast } from "../lib/error/handleError";

function CodeHeader() {
  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const [loadCode] = useLoadCodeMutation();
  const { urlId } = useParams();

  const navigate = useNavigate();

  const [shareBtn, setShareBtn] = useState<boolean>(!!urlId);
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const handlDownload = async () => {
    const htmlCode = new Blob([fullCode.html], { type: "text/html" });
    const cssCode = new Blob([fullCode.css], { type: "text/css" });
    const javascriptCode = new Blob([fullCode.javascript], {
      type: "text/javascript",
    });

    const htmlLink = document.createElement("a");
    const cssLink = document.createElement("a");
    const javascriptLink = document.createElement("a");

    htmlLink.href = URL.createObjectURL(htmlCode);
    htmlLink.download = "index.html";
    document.body.appendChild(htmlLink);

    cssLink.href = URL.createObjectURL(cssCode);
    cssLink.download = "style.css";
    document.body.appendChild(cssLink);

    javascriptLink.href = URL.createObjectURL(javascriptCode);
    javascriptLink.download = "script.js";
    document.body.appendChild(javascriptLink);

    if (
      fullCode.html === "" &&
      fullCode.css === "" &&
      fullCode.javascript === ""
    ) {
      showToast.error("No code to download");
      return;
    }

    if (fullCode.html !== "") {
      htmlLink.click();
    }
    if (fullCode.css !== "") {
      cssLink.click();
    }
    if (fullCode.javascript !== "") {
      javascriptLink.click();
    }

    document.body.removeChild(htmlLink);
    document.body.removeChild(cssLink);
    document.body.removeChild(javascriptLink);

    showToast.success("Code Downloaded Successfully");
  };

  const handleSave = async () => {
    try {
      const response = await saveCode(fullCode).unwrap();
      if (response.url) {
        navigate(`/compiler/${response.url}`, { replace: true });
        setShareBtn(true); // Enable the Share button after saving
        showToast.success("Code saved successfully");
      }
    } catch (error) {
      showToast.error("Error saving code due to missing data");
    }
  };

  const loadTheCode = async () => {
    try {
      if (urlId) {
        const response = await loadCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
      }
    } catch (error) {
      showToast.error("Error loading code");
    }
  };

  useEffect(() => {
    if (urlId) {
      loadTheCode();
      setShareBtn(true); // Ensure Share button is enabled if URL exists
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
      <div className="flex items-center gap-4">
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
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="javascript">JAVASCRIPT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSave}
          variant="ghost"
          className="flex items-center gap-2 px-4 py-2  border-2 border-white rounded-full hover:border-black hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:text-black transition-all duration-300 transform "
        >
          <SaveIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Save</span>
        </Button>

        <Button
          onClick={handlDownload}
          variant="ghost"
          className="flex items-center gap-2 px-4 py-2 border-2 border-white rounded-full hover:border-black hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:text-black "
        >
          <MonitorDown className="w-5 h-5" />
        </Button>

        {shareBtn && (
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2 px-4 py-2 border-2 border-white rounded-full hover:border-black hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:text-black  ">
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
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToast.success("URL has been copied to clipboard!");
                    }}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </AlertDialogDescription>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="px-4 py-2 rounded bg-gray-800 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:border-black text-white transition-all duration-300 ">
                  Cancel
                </AlertDialogCancel> 
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </header>
  );
}

export default CodeHeader;
