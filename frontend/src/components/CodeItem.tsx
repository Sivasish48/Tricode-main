import { ShineBorder } from "./ui/shine-border";
import logo from "../../public/tricodeLogo.png";
import { Link } from "react-router-dom";
import { useDeleteCodeMutation } from "../redux/slices/api";
import { showToast } from "../lib/error/handleError";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

export default function CodeItem({ data }: { data: codeType }) {
  const [deleteCode] = useDeleteCodeMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(true); // <-- Controls dialog state

  const handleDeleteCode = async () => {
    try {
      await deleteCode({ _id: data._id }).unwrap();
      showToast.success("Code deleted successfully!");
      setIsDialogOpen(false); // <-- Close dialog after deletion
    } catch (error) {
      showToast.error("Failed to delete code!");
      console.error("Error deleting code:", error);
    }
  };

  return (
    <ShineBorder
      className="relative flex flex-col items-center justify-center h-[250px] w-[350px] md:h-[280px] md:w-[380px] bg-[#121212] shadow-lg overflow-hidden"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      duration={28}
      borderWidth={2}
    >
      {/* Delete Button at the Top-Right */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-3 right-3 text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            onClick={() => setIsDialogOpen(true)} // <-- Open dialog when clicked
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </DialogTrigger>

        {/* Confirmation Dialog */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-500 text-center">
              Are you sure you want to delete this code?
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-center">This action cannot be undone.</p>
          <div className="flex justify-center gap-3">
            <Button variant="destructive" onClick={handleDeleteCode}>
              Confirm Delete
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Background Logo */}
      <div className="absolute inset-0 flex flex-col items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-contain opacity-20 translate-y-[38px]"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          {data.title}
        </h2>

        {/* Timestamp */}
        <p className="text-sm md:text-base text-gray-400 mb-4">
          Last saved: {new Date(data.createdAt).toLocaleString()}
        </p>

        {/* Open in Editor Button */}
        <Link target="_blank" to={`/compiler/${data._id}`}>
          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] 
            hover:opacity-90 transform hover:scale-105 transition-all duration-300
            text-white font-medium shadow-lg
            border border-white/10 backdrop-blur-sm
            flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span>Open in Editor</span>
          </button>
        </Link>
      </div>
    </ShineBorder>
  );
}