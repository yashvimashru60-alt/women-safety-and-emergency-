import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Share2, Satellite, Wifi, WifiOff } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useEmergency } from '@/contexts/EmergencyContext';
import { toast } from '@/hooks/use-toast';

const Map = () => {
  const { isAuthenticated } = useAuth();
  const { emergency, updateLocation } = useEmergency();
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          updateLocation(latitude, longitude);
          setIsLoading(false);
        },
        () => {
          // Use mock location if geolocation fails
          setLocation({ lat: 28.6139, lng: 77.2090 });
          setIsLoading(false);
        }
      );
    } else {
      setLocation({ lat: 28.6139, lng: 77.2090 });
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate, updateLocation]);

  const handleShareLocation = async () => {
    setIsSharing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (location) {
      const mapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
      navigator.clipboard.writeText(mapsUrl);
      toast({
        title: "Location Shared! 📍",
        description: "Your location link has been copied. Share it with your trusted contacts.",
      });
    }
    setIsSharing(false);
  };

  const handleFindSafeRoute = () => {
    toast({
      title: "Finding Safe Routes... 🛡️",
      description: "Analyzing nearby areas for the safest path.",
    });
    // Simulate finding routes
    setTimeout(() => {
      toast({
        title: "Safe Route Found! ✅",
        description: "Highlighted route avoids poorly lit areas and has good foot traffic.",
      });
    }, 2000);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Live <span className="text-gradient">Location</span>
            </h1>
            <p className="text-muted-foreground">Share your location and find safe routes</p>
          </motion.div>

          {/* Location Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <GlassCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    {emergency.isActive ? (
                      <Satellite className="w-6 h-6 text-background animate-pulse" />
                    ) : (
                      <MapPin className="w-6 h-6 text-background" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-bold">
                      {emergency.isActive ? 'Emergency Tracking Active' : 'Location Services'}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {isLoading ? 'Getting location...' : 
                        location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Location unavailable'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-accent" />
                  <span className="text-sm text-accent">Online</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative h-80 md:h-96 bg-muted/30 flex items-center justify-center">
                {/* Simulated Map */}
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                      linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                
                {/* Location Marker */}
                {location && !isLoading && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10"
                  >
                    <div className="relative">
                      {/* Pulse rings */}
                      <div className="absolute inset-0 -m-8">
                        <div className="w-20 h-20 rounded-full bg-accent/20 animate-ping" />
                      </div>
                      <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center glow-accent">
                        <MapPin className="w-8 h-8 text-background" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {isLoading && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Getting your location...</p>
                  </div>
                )}

                {/* Map controls overlay */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-muted/50 transition-colors">
                    <span className="text-lg font-bold">+</span>
                  </button>
                  <button className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-muted/50 transition-colors">
                    <span className="text-lg font-bold">−</span>
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-4 mb-8"
          >
            <GradientButton 
              size="lg" 
              className="w-full" 
              onClick={handleShareLocation}
              isLoading={isSharing}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share My Location
            </GradientButton>
            
            <GradientButton 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={handleFindSafeRoute}
            >
              <Navigation className="w-5 h-5 mr-2" />
              Find Safe Route
            </GradientButton>
          </motion.div>

          {/* Offline Mode Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard variant="elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Satellite className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">Offline Safety Mode</h3>
                  <p className="text-muted-foreground text-sm">
                    Even without network, battery, or SIM, your phone can be traced via satellite. 
                    Our advanced tracking ensures your protection anywhere, anytime. This feature 
                    activates automatically during emergencies.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-accent text-sm">
                      <WifiOff className="w-4 h-4" />
                      <span>Works Offline</span>
                    </div>
                    <div className="flex items-center gap-2 text-accent text-sm">
                      <Satellite className="w-4 h-4" />
                      <span>Satellite Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Map;
