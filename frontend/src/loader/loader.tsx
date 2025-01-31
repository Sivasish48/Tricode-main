import PulseLoader from "react-spinners/PulseLoader";

function LoadingLad() {
  return (
    <div className="relative w-40 h-[90px] m-auto">
      <PulseLoader color="#C13BCF" size={15} />
    </div>
  );
}

export default LoadingLad;
