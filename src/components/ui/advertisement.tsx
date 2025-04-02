
const Advertisement = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`p-4 bg-gray-100 text-center rounded-lg ${className}`}>
      <p className="text-xs text-gray-500 mb-2">Responsive Advertisement</p>
      <div className="bg-gray-200 h-32 flex items-center justify-center">
        <p className="text-gray-500">Ad Space</p>
      </div>
    </div>
  );
};

export default Advertisement;
