

function PageLoader() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      {/* Custom Loader */}
      <div className="relative w-32 h-32 animate-bounce">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin-slow"></div>

        {/* Middle Ring */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse"></div>

        {/* Inner Circle */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping"></div>
      </div>
    </div>
  );
}

export default PageLoader;
