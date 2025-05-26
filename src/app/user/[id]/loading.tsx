export default function UserLoading() {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-[100vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-700">Loading user profile...</p>
    </div>
  );
}
