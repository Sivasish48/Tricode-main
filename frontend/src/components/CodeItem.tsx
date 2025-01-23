import { ShineBorder } from "./ui/shine-border";
import logo from "../../public/tricodeLogo.png";
import { Link } from "react-router-dom";
import { useDeleteCodeMutation } from "../redux/slices/api";
import { Trash2 } from "lucide-react";

import { showToast } from "../lib/error/handleError";
import { Button } from "./ui/button";


function CodeItem({ data }: { data: codeType }) {
  const [deleteCode] = useDeleteCodeMutation();
  const handleDeleteCode = async () => {
    try {
      const response = await deleteCode({ _id: data._id }).unwrap();
      console.log(response);
       // Ensure awaiting the mutation
      showToast.success("Code deleted successfully!");
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
      {/* Delete Button with Confirmation Dialog */}
      {/* Delete Button with Confirmation Dialog */}
      <Button className="cursor-pointer absolute top-3 right-3 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all"
      >
            <h3 onClick={handleDeleteCode}>Delete</h3>
            
          </Button>

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

export default CodeItem;
