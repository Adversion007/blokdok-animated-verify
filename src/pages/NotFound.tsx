
import { useLocation, Link } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Background3D from "@/components/Background3D";
import { ErrorBoundary } from "react-error-boundary";

const FallbackBackground = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black -z-10"></div>
);

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <ErrorBoundary fallback={<FallbackBackground />}>
        <Suspense fallback={<FallbackBackground />}>
          <Background3D />
        </Suspense>
      </ErrorBoundary>
      
      <div className="text-center relative z-10 max-w-md mx-auto px-4">
        <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Page not found</p>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button className="bg-blokdok-purple hover:bg-blokdok-darkPurple" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
