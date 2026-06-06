import React, { useEffect } from 'react';
import { Bell, CloudLightning, ShieldAlert, Droplet, X } from 'lucide-react';

/**
 * Renders floating push notifications inside the application.
 * @param {Object} props
 * @param {Object|null} props.activeNotification - Current active notification details
 * @param {Function} props.onDismiss - Triggered when closing a notification banner
 */
export const NotificationBanner = ({ activeNotification, onDismiss }) => {
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000); // Auto-dismiss after 5s

      return () => clearTimeout(timer);
    }
  }, [activeNotification, onDismiss]);

  if (!activeNotification) return null;

  const { id, type, title, message } = activeNotification;

  const getAlertIcon = () => {
    switch (type) {
      case 'weather':
        return <CloudLightning style={{ color: '#ffb74d' }} size={20} />;
      case 'care':
        return <Droplet style={{ color: '#64b5f6' }} size={20} />;
      case 'disease':
        return <ShieldAlert style={{ color: '#e57373' }} size={20} />;
      default:
        return <Bell style={{ color: '#81c784' }} size={20} />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'weather': return 'rgba(255, 183, 77, 0.4)';
      case 'care': return 'rgba(100, 181, 246, 0.4)';
      case 'disease': return 'rgba(229, 115, 115, 0.4)';
      default: return 'rgba(76, 175, 80, 0.4)';
    }
  };

  return (
    <div 
      className="cropguard-notification-banner animate-slide-down" 
      style={{
        position: 'absolute',
        top: '65px', // Below the simulated iOS status bar
        left: '16px',
        right: '16px',
        background: 'rgba(18, 30, 20, 0.95)',
        backdropFilter: 'blur(16px)',
        border: `1.5px solid ${getBorderColor()}`,
        borderRadius: '16px',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
        zIndex: 9999,
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div className="icon-wrapper" style={{
        background: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '12px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getAlertIcon()}
      </div>

      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <h4 style={{ margin: '0', fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
          {title}
        </h4>
        <p style={{ margin: '0', fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.3' }}>
          {message}
        </p>
      </div>

      <button 
        onClick={onDismiss} 
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.3)',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.color = '#ffffff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.3)'}
      >
        <X size={16} />
      </button>
    </div>
  );
};
export default NotificationBanner;
