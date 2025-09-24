import { useAuth } from '../contexts/AuthContext';
import { GoogleIcon } from '../components/ui/GoogleIcon';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen h-screen w-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 fixed inset-0">
      <div className="mx-auto w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Inventory Tracker
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your inventory
        </p>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <button
            onClick={login}
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <GoogleIcon className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}