import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export default function NotFound() {
  const [location, setLocation] = useLocation();
  
  // Set page title for SEO
  useEffect(() => {
    document.title = "404 - Page Not Found | Personality Mosaic";
    
    // Log the navigation to a non-existent page
    console.error(`Attempted navigation to non-existent page: ${location}`);
  }, [location]);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-red-500">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center mb-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">404</h1>
            <p className="text-xl mt-2 text-gray-700">Page Not Found</p>
            <p className="mt-4 text-gray-600">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pb-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button 
            className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9]" 
            asChild
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
