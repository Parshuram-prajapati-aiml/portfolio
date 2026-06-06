import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

/**
 * MobileFrame wraps the entire app in a realistic premium smartphone shell on desktop displays.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inside app content
 */
export const MobileFrame = ({ children }) => {
  const [time, setTime] = useState('');

  // Tick the simulated clock in the status bar
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mobile-frame-wrapper" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, #112613 0%, #071108 90%)',
      padding: '20px',
      overflow: 'hidden',
      fontFamily: "'Outfit', 'Inter', sans-serif"
    }}>
      {/* Decorative background leaves floating */}
      <div className="bg-leaf leaf-left" />
      <div className="bg-leaf leaf-right" />

      {/* Main iPhone Chassis Container */}
      <div className="phone-chassis" style={{
        position: 'relative',
        width: '400px',
        height: '820px',
        background: '#070f08',
        borderRadius: '52px',
        border: '12px solid #273e2a',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.05), 0 0 0 2px rgba(76, 175, 80, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {/* Dynamic Island / Camera Notch */}
        <div className="dynamic-island" style={{
          position: 'absolute',
          top: '11px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110px',
          height: '28px',
          background: '#000000',
          borderRadius: '20px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}>
          {/* Mock Camera Lens and Sensor */}
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0e1a10', border: '1.5px solid #203522' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1a3c40' }} />
        </div>

        {/* Status Bar */}
        <div className="phone-status-bar" style={{
          height: '46px',
          padding: '12px 24px 0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          zIndex: 9999,
          userSelect: 'none',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '-0.2px'
        }}>
          {/* Time display */}
          <span style={{ fontSize: '12.5px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{time}</span>
          
          {/* System status icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Signal size={14} style={{ color: '#ffffff', opacity: '0.9' }} />
            <span style={{ fontSize: '10px', opacity: '0.9', fontWeight: '800' }}>5G</span>
            <Wifi size={14} style={{ color: '#ffffff', opacity: '0.9' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Battery size={16} style={{ color: '#81c784', opacity: '0.95' }} />
            </div>
          </div>
        </div>

        {/* App Frame Content Viewport */}
        <div className="phone-viewport" style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: 'linear-gradient(180deg, #112413 0%, #081109 100%)',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none' // IE 10+
        }}>
          {children}
        </div>

        {/* Bottom iOS Home Indicator */}
        <div className="phone-home-indicator-area" style={{
          height: '18px',
          background: 'transparent',
          position: 'relative',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <div className="home-bar" style={{
            width: '120px',
            height: '4.5px',
            background: 'rgba(255, 255, 255, 0.45)',
            borderRadius: '10px',
            marginBottom: '4px'
          }} />
        </div>
      </div>
    </div>
  );
};
export default MobileFrame;
