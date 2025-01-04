function PageLoader() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      {/* Custom Loader */}
      <div className="relative w-40 h-40 animate-bounce">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin-slow"></div>

        {/* Middle Ring */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse"></div>

        {/* Inner Circle */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 animate-ping"></div>

        {/* Core Circle */}
        <div className="absolute inset-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
}

export default PageLoader;
