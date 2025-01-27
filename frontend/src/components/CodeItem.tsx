import logo from "../../public/tricodeLogo.png";
import { Link } from "react-router-dom";
import { useDeleteCodeMutation } from "../redux/slices/api";
import { showToast } from "../lib/error/handleError";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../components/ui/context-menu";

export default function CodeItem({ data }: { data: codeType }) {
  const [deleteCode] = useDeleteCodeMutation();

  const handleDeleteCode = async () => {
    try {
      await deleteCode({ _id: data._id }).unwrap();
      showToast.success("Code deleted successfully!");
    } catch (error) {
      showToast.error("Failed to delete code!");
      console.error("Error deleting code:", error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={() => console.log("clicked")}
          className="relative flex flex-col items-center justify-center 
          h-[250px] w-[350px] md:h-[280px] md:w-[380px] 
          bg-[#121212]/70 backdrop-blur-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] 
          border border-white/10 rounded-xl overflow-hidden 
          transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          {/* Subtle Logo Overlay */}
          <div className="absolute inset-0 flex flex-col items-center">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain opacity-10 translate-y-[38px]"
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-6 tracking-wide">
              {data.title}
            </h2>

            <p className="text-sm md:text-base text-gray-300">
              Last saved: {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Context Menu */}
        <ContextMenuContent className="bg-[#1e1e1e] text-white border border-white/10 rounded-lg shadow-xl">
          <ContextMenuItem className="bg-[#1e1e1e] text-white p-2 my-2 w-full rounded-md">
            <Link target="_blank" to={`/compiler/${data._id}`}>
              Open In Editor
            </Link>
          </ContextMenuItem>
          <ContextMenuItem className="bg-[#1e1e1e] text-white p-2 my-2 w-full rounded-md cursor-pointer">
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            onClick={handleDeleteCode}
            className="bg-[#1e1e1e] text-white p-2 my-2 w-full rounded-md cursor-pointer"
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
