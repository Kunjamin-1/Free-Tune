
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-50">
      <div className="absolute w-10 h-10">
        <div
          className="absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-blue-600 animate-spin"
          style={{
            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), white 0)",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), white 0)"
          }}></div>
      </div>
    </div>
  );
};

export default Loader;
