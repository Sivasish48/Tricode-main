import { compilerSliceStateType } from "../redux/slices/CompilerSlice";
import { ShineBorder } from "./ui/shine-border";
import logo from "../../public/tricodeLogo.png";

function CodeItem({
  data,
  onOpenEditor,
}: {
  data: { fullCode: compilerSliceStateType["fullCode"]; title: string; createdAt: string };
  onOpenEditor?: () => void;
}) {
  return (
    <ShineBorder
      className="relative flex flex-col items-center justify-center h-[250px] w-[350px] md:h-[280px] md:w-[380px] bg-[#121212] shadow-lg overflow-hidden"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      duration={28}
      borderWidth={2}
    >
      {/* Background Logo - Repositioned */}
      <div className="absolute inset-0 flex flex-col items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-contain opacity-20 translate-y-[38px]" // Moved down
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title - Made Larger */}
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          {data.title}
        </h2>

        {/* Timestamp */}
        <p className="text-sm md:text-base text-gray-400 mb-4">
          Last saved: {new Date(data.createdAt).toLocaleString()}
        </p>

        {/* Open in Editor Button */}
        <button
          onClick={onOpenEditor}
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
      </div>
    </ShineBorder>
  );
}

export default CodeItem;