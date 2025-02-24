
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link to="/">
        <Button variant="default">Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
