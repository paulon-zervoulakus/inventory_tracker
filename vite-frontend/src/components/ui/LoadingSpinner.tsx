export function LoadingSpinner() {
  return (
    <div className="min-h-screen h-screen w-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Loading...
        </p>
      </div>
    </div>
  );
}