import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, MapPin, Phone, Bell, Satellite, Users, ChevronRight } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import { GlassCard } from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';

const features = [
  {
    icon: Bell,
    title: 'Instant SOS Alert',
    description: 'One-tap emergency button that alerts your trusted contacts and nearby authorities instantly.',
  },
  {
    icon: MapPin,
    title: 'Live Location Sharing',
    description: 'Share your real-time location with family and friends. Safe routes suggested automatically.',
  },
  {
    icon: Satellite,
    title: 'Offline Safety Mode',
    description: 'Your phone can be traced via satellite even without network, battery, or SIM.',
  },
  {
    icon: Users,
    title: 'Trusted Circle',
    description: 'Build your safety network with family, friends, and verified responders.',
  },
];

const stats = [
  { value: '50K+', label: 'Women Protected' },
  { value: '15sec', label: 'Avg Response Time' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-urgent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">India's Most Trusted Safety App</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Your Safety,{' '}
                <span className="text-gradient">Our Mission</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Raksha empowers women with instant emergency alerts, real-time location sharing, 
                and a network of trusted contacts — all in one powerful app.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <GradientButton size="lg" className="min-w-[200px]">
                    Get Started Free
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </GradientButton>
                </Link>
                <Link to="/login">
                  <GradientButton variant="outline" size="lg" className="min-w-[200px]">
                    Login
                  </GradientButton>
                </Link>
              </div>
            </motion.div>
            
            {/* Floating SOS Button Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-16"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-urgent/30 rounded-full blur-2xl animate-pulse" />
                <Link to="/sos">
                  <div className="relative w-32 h-32 rounded-full gradient-button flex items-center justify-center glow-accent cursor-pointer hover:scale-105 transition-transform">
                    <div className="text-center">
                      <Bell className="w-10 h-10 text-background mx-auto mb-1" />
                      <span className="text-sm font-bold text-background">SOS</span>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Safety Features That <span className="text-gradient">Matter</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built with cutting-edge technology to ensure your safety, anytime, anywhere.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <GlassCard variant="elevated" className="max-w-4xl mx-auto text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Ready to Feel <span className="text-gradient">Safe</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands of women who trust Raksha for their daily safety. 
                Download now and add your first trusted contact.
              </p>
              <Link to="/signup">
                <GradientButton size="xl">
                  Create Free Account
                  <ChevronRight className="w-5 h-5 ml-2" />
                </GradientButton>
              </Link>
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent" />
              <span className="font-display font-bold text-gradient">Raksha</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 Raksha. Empowering Women's Safety.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-muted-foreground hover:text-foreground transition-colors">
                Sign Up
              </Link>
              <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
