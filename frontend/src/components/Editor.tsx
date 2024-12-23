import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";

import CodeHeader from "./CodeHeader";
import CodeEditor from "../components/CodeEditor";
import tricodeLogo from "../../public/tricodeLogo.png";
import RenderCode from "./RenderCode.tsx";
import { useNavigate } from "react-router-dom";
export default function Editor() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Top Header with Logo and Account Creation Button */}
      <div className="w-full h-[60px] flex items-center justify-between px-4 bg-black text-white">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={tricodeLogo} alt="Tricode Logo" className="h-14 w-auto" />
        </div>

        {/* Account Creation Button */}
        <button className="px-4 py-2 text-sm font-semibold border-none rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          onClick={() => navigate("/login")}>
          Create Account
        </button>
      </div>

      {/* Resizable Panels */}
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-screen rounded-lg border"
      >
        {/* Left Side - Single Code Editor */}
        <ResizablePanel defaultSize={50} className="min-w-[250px]">
          <div className="h-full">
            {/* Code Header */}
            <CodeHeader />

            {/* Code Editor */}
            <div className="flex-grow">
              <CodeEditor />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Side - Output */}
        <ResizablePanel defaultSize={50} className="min-w-[250px] bg-black">
          <RenderCode />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
