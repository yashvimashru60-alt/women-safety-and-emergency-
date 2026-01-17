import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, User, LogOut, MapPin, Phone, LayoutDashboard, AlertTriangle, LucideIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { GradientButton } from '@/components/ui/GradientButton';

interface NavLinkItem {
  to: string;
  label: string;
  icon?: LucideIcon;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const publicLinks: NavLinkItem[] = [
    { to: '/', label: 'Home' },
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Get Started' },
  ];

  const authLinks: NavLinkItem[] = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/sos', label: 'SOS', icon: AlertTriangle },
    { to: '/map', label: 'Map', icon: MapPin },
    { to: '/contacts', label: 'Contacts', icon: Phone },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = isAuthenticated ? authLinks : publicLinks;

  const renderIcon = (Icon?: LucideIcon) => {
    if (!Icon) return null;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-lg gradient-button"
            >
              <Shield className="w-6 h-6 text-background" />
            </motion.div>
            <span className="text-xl font-display font-bold text-gradient">Raksha</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  location.pathname === link.to
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {renderIcon(link.icon)}
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && (
              <>
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    location.pathname === '/admin'
                      ? 'text-accent bg-accent/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Admin
                </Link>
                <GradientButton variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </GradientButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === link.to
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {renderIcon(link.icon)}
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <>
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      <User className="w-4 h-4" />
                      Admin
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-urgent w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
