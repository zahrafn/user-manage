export const SkeletonUserCard = () => {
  return (
    <div className="p-4 border border-gray-400 rounded shadow animate-pulse flex space-x-4 bg-white">
      <div className="rounded-full bg-gray-300 h-12 w-12"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};