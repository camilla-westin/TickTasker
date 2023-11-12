const ProgressDisplay = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-green-300 h-2.5 rounded-full border-green-400"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressDisplay;
