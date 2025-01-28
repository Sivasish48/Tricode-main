import CodeItem from "../components/CodeItem";
import { useGetMyCodesQuery } from "../redux/slices/api";
import "./pagesStyles/logSign-bg.css";
import NoCodeMessage from "../components/NoCodeMessage";

function MySavedCodes() {
  const { data: myCodes } = useGetMyCodesQuery();

  return (
    <div className="log-sign-bg min-h-screen bg-black text-gray-200 p-8">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent mb-6">
        My Saved Codes
      </h1>
      {!myCodes || myCodes.length === 0 ? (
        <NoCodeMessage />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {myCodes.map((item, index) => (
            <CodeItem key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MySavedCodes;
