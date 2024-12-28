import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";

import CodeHeader from "./CodeHeader";
import CodeEditor from "../components/CodeEditor";
import RenderCode from "./RenderCode.tsx";
import Header from "./Header.tsx";

export default function Editor() {
  return (
    // Add a parent container like a fragment or div
    <>
    <Header />
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
    </>
  );
}
