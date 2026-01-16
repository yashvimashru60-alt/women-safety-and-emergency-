import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, Phone, AlertTriangle, Bell, Users, Activity, ChevronRight } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import { GlassCard } from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import SOSButton from '@/components/sos/SOSButton';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import { useEmergency } from '@/contexts/EmergencyContext';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { contacts } = useContacts();
  const { emergency } = useEmergency();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const emergencyContacts = contacts.filter(c => c.isEmergency).length;

  const quickActions = [
    { icon: MapPin, label: 'Share Location', to: '/map', color: 'bg-accent' },
    { icon: Phone, label: 'Quick Call', to: '/contacts', color: 'bg-primary' },
    { icon: Users, label: 'Add Contact', to: '/contacts', color: 'bg-urgent' },
  ];

  const safetyTips = [
    'Share your live location with trusted contacts before traveling.',
    'Keep your phone charged and emergency contacts updated.',
    'Trust your instincts - if something feels wrong, activate SOS.',
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Hello, <span className="text-gradient">{user?.name}</span> 👋
            </h1>
            <p className="text-muted-foreground">Your safety dashboard is ready. Stay protected!</p>
          </motion.div>

          {/* Emergency Status Banner */}
          {emergency.isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <GlassCard variant="urgent" className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-emergency flex items-center justify-center animate-pulse">
                    <Bell className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="font-bold text-urgent">🚨 SOS ACTIVE</h3>
                    <p className="text-muted-foreground">Emergency alerts are being sent to your contacts</p>
                  </div>
                </div>
                <Link to="/sos">
                  <GradientButton variant="urgent" size="sm">
                    View Status
                  </GradientButton>
                </Link>
              </GlassCard>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main SOS Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <GlassCard className="text-center py-12">
                <h2 className="text-2xl font-display font-bold mb-6">Emergency SOS</h2>
                <div className="flex justify-center mb-6">
                  <SOSButton size="lg" />
                </div>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Hold the button for 1.5 seconds to activate emergency alert. 
                  All your trusted contacts will be notified immediately.
                </p>
                <div className="mt-6">
                  <Link to="/sos">
                    <GradientButton variant="outline" size="md">
                      Go to Full SOS Page
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </GradientButton>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>

            {/* Status Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center">
                    <Users className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold">{emergencyContacts}</p>
                    <p className="text-muted-foreground text-sm">Emergency Contacts</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Activity className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-accent">Active</p>
                    <p className="text-muted-foreground text-sm">Protection Status</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Shield className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Offline Ready</p>
                    <p className="text-muted-foreground text-sm">Satellite Tracking</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-xl font-display font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.label} to={action.to}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GlassCard className="text-center py-6 hover:border-accent/50 transition-colors cursor-pointer">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <action.icon className="w-6 h-6 text-background" />
                      </div>
                      <p className="font-medium text-sm">{action.label}</p>
                    </GlassCard>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Safety Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl font-display font-bold mb-4">Safety Tips</h2>
            <GlassCard>
              <div className="space-y-4">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-button flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-background">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
