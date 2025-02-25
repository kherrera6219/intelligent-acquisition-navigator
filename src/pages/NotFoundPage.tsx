
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="glass-card p-8 sm:p-12 max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gradient">404</h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8">
          We couldn't find the page you're looking for
        </p>
        <Link to="/" className="block">
          <Button 
            variant="default" 
            size="lg"
            className="w-full sm:w-auto animate-fade-in"
          >
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
