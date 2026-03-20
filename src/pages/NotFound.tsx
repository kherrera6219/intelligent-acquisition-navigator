
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="h-20 w-20 rounded-full bg-violet-500/10 flex items-center justify-center mb-6">
        <FileQuestion className="h-10 w-10 text-violet-400" aria-hidden="true" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-4">Page not found</h2>
      <p className="text-gray-400 max-w-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="border-white/10"
        >
          Go back
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
