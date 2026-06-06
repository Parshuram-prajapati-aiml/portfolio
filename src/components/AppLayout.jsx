import React from 'react';
import { Sprout, Home, MessageSquare, Scan, History, User, LogOut, Globe, Bell, Sun, CloudRain, Droplets } from 'lucide-react';
import { translations } from '../data/translations';
import NotificationBanner from './NotificationBanner';

/**
 * AppLayout wraps the entire app. It replaces the mobile frame and provides
 * a widescreen layout with a sidebar menu on the left (Home, Scan, Expert, History, Profile)
 * and a top toolbar containing active alerts, weather forecasts, profile credentials,
 * and the language selector. On mobile, it collapses gracefully.
 */
export const AppLayout = ({
  children,
  currentScreen,
  onNavigate,
  language,
  onLanguageChange,
  user,
  onLogout,
  activeNotification,
  onDismissNotification
}) => {
  const t = translations[language] || translations.en;

  // Don't show layout elements on the login screen
  if (currentScreen === 'login') {
    return (
      <div className="login-wrapper" style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 10% 20%, #112613 0%, #071108 90%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background decorative leaves */}
        <div className="bg-leaf leaf-left" />
        <div className="bg-leaf leaf-right" />
        
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px', padding: '20px' }}>
          {children}
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'camera', label: 'AI Diagnosis Scan', icon: Scan },
    { id: 'expert', label: t.expertConsult, icon: MessageSquare },
    { id: 'history', label: t.scanHistory, icon: History },
    { id: 'profile', label: t.profile, icon: User }
  ];

  const languagesList = [
    { code: 'en', name: 'EN' },
    { code: 'hi', name: 'हिं' },
    { code: 'te', name: 'తె' },
    { code: 'pa', name: 'ਪੰ' },
    { code: 'es', name: 'ES' }
  ];

  return (
    <div className="webapp-layout-container" style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, #0a170b 0%, #040905 90%)',
      color: '#ffffff',
      fontFamily: "'Outfit', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating background decorative leaves */}
      <div className="bg-leaf leaf-left" style={{ opacity: 0.7 }} />
      <div className="bg-leaf leaf-right" style={{ opacity: 0.7 }} />

      {/* Global Widescreen Sidebar Navigation */}
      <aside className="desktop-sidebar" style={{
        width: '280px',
        background: 'rgba(12, 23, 14, 0.85)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(76, 175, 80, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 20px',
        zIndex: 100,
        position: 'relative'
      }}>
        {/* Brand Identity Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
          }}>
            <Sprout size={22} />
          </div>
          <div>
            <h1 style={{ margin: '0', fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px', color: '#ffffff' }}>
              CropGuard <span style={{ color: '#81c784' }}>AI</span>
            </h1>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase' }}>
              Smart Pathology Deck
            </span>
          </div>
        </div>

        {/* User Card inside Sidebar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '28px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(76, 175, 80, 0.15)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            👨‍🌾
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h4 style={{ margin: '0', fontSize: '12.5px', fontWeight: '750', color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {user?.name || 'Farmer'}
            </h4>
            <span style={{ fontSize: '9px', color: '#81c784', display: 'block', marginTop: '1px' }}>
              📍 {user?.location?.split(',')[0] || 'Punjab'}
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id || 
              (item.id === 'camera' && currentScreen === 'diagnosis');
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="sidebar-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: isActive ? 'rgba(76, 175, 80, 0.12)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3.5px solid #81c784' : '3.5px solid transparent',
                  borderRadius: '0 12px 12px 0',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13.5px',
                  fontWeight: isActive ? '700' : '500',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                <Icon size={18} style={{ color: isActive ? '#81c784' : 'inherit' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer - Logout */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              borderRadius: '12px',
              color: '#ef5350',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s',
              outline: 'none'
            }}
          >
            <LogOut size={18} />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Floating Pop-up Notification Banner */}
      <NotificationBanner 
        activeNotification={activeNotification} 
        onDismiss={onDismissNotification} 
      />

      {/* Main Content Area */}
      <div className="main-content-panel" style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Sticky Header Console for Desktop/Mobile */}
        <header className="webapp-header" style={{
          height: '72px',
          background: 'rgba(10, 20, 11, 0.5)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 90
        }}>
          {/* Brand/Mobile Title */}
          <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Mobile-only logo */}
            <div className="mobile-logo-wrapper" style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Sprout size={16} />
            </div>
            <h2 className="header-title" style={{ margin: '0', fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>
              🌾 Crop Health Dashboard
            </h2>
          </div>

          {/* Quick Stats Toolbar & Selector Deck */}
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Weather parameters bar - Desktop only */}
            <div className="header-weather-stats" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(0,0,0,0.2)',
              padding: '6px 12px',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.04)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.7)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sun size={12} style={{ color: '#ffb74d' }} />
                <span>31.5°C</span>
              </div>
              <div style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Droplets size={12} style={{ color: '#64b5f6' }} />
                <span>88% Humidity</span>
              </div>
            </div>

            {/* Quick Language Translation Console */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '4px'
            }}>
              <Globe size={13} style={{ color: '#81c784', marginLeft: '4px', marginRight: '2px' }} />
              {languagesList.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    style={{
                      padding: '3px 6px',
                      borderRadius: '6px',
                      border: 'none',
                      background: isActive ? 'rgba(76, 175, 80, 0.25)' : 'transparent',
                      color: isActive ? '#81c784' : 'rgba(255,255,255,0.5)',
                      fontSize: '10px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                  >
                    {lang.name}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Responsive Content Body Viewport */}
        <main className="content-viewport" style={{
          flex: '1',
          overflowY: 'auto',
          padding: '24px',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
