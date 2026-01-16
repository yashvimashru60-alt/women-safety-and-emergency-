import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Users, AlertTriangle, MapPin, Activity, 
  Bell, CheckCircle, Clock, TrendingUp, BarChart3
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock data for admin dashboard
const mockAlerts = [
  { id: '1', user: 'Priya Sharma', location: 'Connaught Place, Delhi', time: '2 mins ago', status: 'active' },
  { id: '2', user: 'Anjali Verma', location: 'Sector 18, Noida', time: '15 mins ago', status: 'resolved' },
  { id: '3', user: 'Sneha Patel', location: 'MG Road, Gurgaon', time: '1 hour ago', status: 'resolved' },
];

const mockStats = {
  totalUsers: 52847,
  activeAlerts: 3,
  resolvedToday: 28,
  avgResponseTime: '12 sec',
};

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(mockAlerts);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'resolved' } : a
    ));
    toast({
      title: "Alert Resolved ✅",
      description: "The emergency alert has been marked as resolved.",
    });
  };

  const handleDispatchHelp = (id: string, userName: string) => {
    toast({
      title: "Help Dispatched 🚔",
      description: `Emergency responders are being sent to ${userName}'s location.`,
    });
  };

  if (!isAuthenticated) return null;

  const activeAlerts = alerts.filter(a => a.status === 'active');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg gradient-button">
                <Shield className="w-6 h-6 text-background" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                Authority <span className="text-gradient">Dashboard</span>
              </h1>
            </div>
            <p className="text-muted-foreground">Monitor and respond to emergency alerts in real-time</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Users className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{mockStats.totalUsers.toLocaleString()}</p>
                  <p className="text-muted-foreground text-sm">Protected Users</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-urgent flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-urgent">{mockStats.activeAlerts}</p>
                  <p className="text-muted-foreground text-sm">Active Alerts</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{mockStats.resolvedToday}</p>
                  <p className="text-muted-foreground text-sm">Resolved Today</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center">
                  <Clock className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{mockStats.avgResponseTime}</p>
                  <p className="text-muted-foreground text-sm">Avg Response</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-urgent" />
                Live Emergency Alerts
              </h2>

              <div className="space-y-4">
                {alerts.map((alert) => (
                  <GlassCard 
                    key={alert.id}
                    variant={alert.status === 'active' ? 'urgent' : 'default'}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          alert.status === 'active' ? 'gradient-emergency animate-pulse' : 'bg-muted'
                        }`}>
                          <AlertTriangle className={`w-6 h-6 ${
                            alert.status === 'active' ? 'text-background' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {alert.user}
                            {alert.status === 'active' && (
                              <span className="px-2 py-0.5 bg-urgent/20 text-urgent text-xs rounded-full">
                                ACTIVE
                              </span>
                            )}
                            {alert.status === 'resolved' && (
                              <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">
                                RESOLVED
                              </span>
                            )}
                          </h3>
                          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4" />
                            {alert.location}
                          </p>
                          <p className="text-muted-foreground text-xs mt-1">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {alert.time}
                          </p>
                        </div>
                      </div>
                      
                      {alert.status === 'active' && (
                        <div className="flex flex-col gap-2">
                          <GradientButton 
                            size="sm" 
                            variant="urgent"
                            onClick={() => handleDispatchHelp(alert.id, alert.user)}
                          >
                            Dispatch Help
                          </GradientButton>
                          <GradientButton 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Mark Resolved
                          </GradientButton>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Quick Overview
              </h2>

              <GlassCard>
                <h3 className="font-semibold mb-4">Response Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Today's Response Rate</span>
                      <span className="font-semibold text-accent">98%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-button w-[98%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">User Satisfaction</span>
                      <span className="font-semibold text-accent">95%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-button w-[95%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Coverage Area</span>
                      <span className="font-semibold text-accent">87%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-button w-[87%]" />
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle, text: 'Alert #127 resolved', time: '5m ago', color: 'text-accent' },
                    { icon: Bell, text: 'New user registered', time: '12m ago', color: 'text-primary' },
                    { icon: TrendingUp, text: 'Response time improved', time: '1h ago', color: 'text-accent' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      <span className="text-muted-foreground flex-1">{activity.text}</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard variant="elevated">
                <div className="text-center">
                  <Activity className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h3 className="font-display font-bold text-lg">System Status</h3>
                  <p className="text-accent text-sm mt-1">All Systems Operational</p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
