import HashLoader from "react-spinners/HashLoader";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <HashLoader size={190} color="#C13BCF" />
    </div>
  );
}

export default PageLoader;
