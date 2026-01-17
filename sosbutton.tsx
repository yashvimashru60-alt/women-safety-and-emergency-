import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useEmergency } from '@/contexts/EmergencyContext';

interface SOSButtonProps {
  size?: 'sm' | 'lg';
}

const SOSButton: React.FC<SOSButtonProps> = ({ size = 'lg' }) => {
  const { emergency, triggerSOS, cancelSOS } = useEmergency();
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const buttonSize = size === 'lg' ? 'w-48 h-48' : 'w-24 h-24';
  const iconSize = size === 'lg' ? 'w-16 h-16' : 'w-8 h-8';
  const textSize = size === 'lg' ? 'text-2xl' : 'text-sm';

  const handlePressStart = () => {
    if (emergency.isActive) {
      cancelSOS();
      return;
    }
    
    setIsHolding(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        triggerSOS();
        setIsHolding(false);
        setHoldProgress(0);
      }
    }, 30);

    const handleRelease = () => {
      clearInterval(interval);
      setIsHolding(false);
      setHoldProgress(0);
      window.removeEventListener('mouseup', handleRelease);
      window.removeEventListener('touchend', handleRelease);
    };

    window.addEventListener('mouseup', handleRelease);
    window.addEventListener('touchend', handleRelease);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings */}
      {emergency.isActive && (
        <>
          <motion.div
            className={`absolute ${buttonSize} rounded-full bg-urgent/30`}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className={`absolute ${buttonSize} rounded-full bg-urgent/20`}
            animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}

      {/* Progress ring */}
      {isHolding && (
        <svg className={`absolute ${buttonSize}`} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="hsl(var(--urgent))"
            strokeWidth="4"
            strokeDasharray={`${holdProgress * 3.01} 301`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all"
          />
        </svg>
      )}

      {/* Main button */}
      <motion.button
        onMouseDown={handlePressStart}
        onTouchStart={handlePressStart}
        className={`relative ${buttonSize} rounded-full flex flex-col items-center justify-center ${
          emergency.isActive 
            ? 'gradient-emergency animate-pulse-glow' 
            : 'gradient-button glow-accent'
        } transition-all cursor-pointer select-none`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AlertTriangle className={`${iconSize} text-background mb-2`} />
        <span className={`${textSize} font-bold text-background`}>
          {emergency.isActive ? 'CANCEL' : 'HOLD'}
        </span>
        {!emergency.isActive && (
          <span className="text-xs text-background/80 mt-1">for SOS</span>
        )}
      </motion.button>
    </div>
  );
};

export default SOSButton;
