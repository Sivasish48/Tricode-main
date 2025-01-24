import CodeItem from "../components/CodeItem";
import { useGetMyCodesQuery } from "../redux/slices/api";
import "./pagesStyles/logSign-bg.css";

function MySavedCodes() {
  const { data: myCodes } = useGetMyCodesQuery();

  // No saved codes component
  const NoCodesMessage = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="bg-[#121212] p-8 rounded-lg border border-gray-800 shadow-xl">
        <div className="bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent text-6xl mb-4">
          📝
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent mb-3">
          No Saved Codes Yet
        </h2>
        <p className="text-gray-400 text-center max-w-md">
          Start coding and save your work to see them appear here!
        </p>
      </div>
    </div>
  );

  return (
    <div className="log-sign-bg min-h-screen bg-black text-gray-200 p-8">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent mb-6">
        My Saved Codes
      </h1>

      {/* Conditional Rendering */}
      {!myCodes || myCodes.length === 0 ? (
        <NoCodesMessage />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {myCodes.map((item, index) => (
            <CodeItem key={index} data={item}  />
          ))}
        </div>
      )}
    </div>
  );
}

export default MySavedCodes;