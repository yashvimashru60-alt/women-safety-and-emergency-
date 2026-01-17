import { Link } from "react-router-dom";
import { Home, Shield, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div className="relative z-10 text-center max-w-lg glass rounded-2xl p-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-button mb-6">
          <AlertTriangle className="w-10 h-10 text-background" />
        </div>
        <h1 className="text-6xl font-display font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist. Let's get you back to safety.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg gradient-button text-background">
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <Link to="/dashboard" className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg border-2 border-accent text-accent hover:bg-accent/10">
            <Shield className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
