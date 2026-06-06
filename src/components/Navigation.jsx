import React from 'react';
import { Home, MessageSquare, Scan, History, User } from 'lucide-react';
import { translations } from '../data/translations';

/**
 * Navigation provides a modern bottom tab bar with glassmorphic styles.
 * @param {Object} props
 * @param {string} props.currentScreen - The active screen ID
 * @param {Function} props.onNavigate - Callback when clicking a tab
 * @param {string} props.language - The active language code
 */
export const Navigation = ({ currentScreen, onNavigate, language }) => {
  const t = translations[language] || translations.en;

  const tabs = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'expert', label: t.expertConsult.split(' ')[0], icon: MessageSquare },
    { id: 'camera', label: 'Scan', icon: Scan, isFloating: true },
    { id: 'history', label: t.scanHistory.split(' ')[0], icon: History },
    { id: 'profile', label: t.profile.split(' ')[0], icon: User }
  ];

  return (
    <div className="bottom-navigation-bar" style={{
      position: 'absolute',
      bottom: '12px',
      left: '12px',
      right: '12px',
      height: '68px',
      background: 'rgba(18, 30, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(76, 175, 80, 0.15)',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 8px',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
      zIndex: 9998,
      userSelect: 'none'
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id || 
          (tab.id === 'camera' && currentScreen === 'diagnosis') ||
          (tab.id === 'camera' && currentScreen === 'details');

        if (tab.isFloating) {
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="nav-floating-btn"
              style={{
                position: 'relative',
                top: '-18px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
                border: '4px solid #112413',
                boxShadow: '0 8px 24px rgba(76, 175, 80, 0.4), 0 0 0 1px rgba(76, 175, 80, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                outline: 'none',
                zIndex: 9999
              }}
            >
              {/* Outer pulsing ring */}
              <span className="pulse-ring" style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                border: '2px solid #81c784',
                opacity: 0.8,
                animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                pointerEvents: 'none'
              }} />
              <Icon size={24} strokeWidth={2.5} />
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              height: '100%',
              padding: '6px 12px',
              background: 'transparent',
              border: 'none',
              color: isActive ? '#81c784' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              outline: 'none',
              flex: '1'
            }}
          >
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
              transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)'
            }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: '-6px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#81c784',
                  boxShadow: '0 0 8px #81c784'
                }} />
              )}
            </div>
            <span style={{ 
              opacity: isActive ? 1 : 0.8,
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s'
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
export default Navigation;
