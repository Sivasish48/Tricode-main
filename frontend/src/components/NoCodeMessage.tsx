function NoCodeMessage() {
  return (
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
}

export default NoCodeMessage;
