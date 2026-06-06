import React, { useState } from 'react';
import { User, Shield, Bell, Droplets, SprayCan, Leaf, LogOut, CheckCircle } from 'lucide-react';
import { translations } from '../data/translations';
import { LanguageSelector } from '../components/LanguageSelector';

/**
 * ProfileScreen handles farmer profiles, alerts, translations, and app preferences.
 * @param {Object} props
 * @param {Object} props.user - Farmer metadata details
 * @param {string} props.language - Active language locale key
 * @param {Function} props.onLanguageChange - Change application locale
 * @param {Function} props.onLogout - Clear user credentials and reset screens
 * @param {Function} props.onPushMockNotification - Triggers a sliding banner alert for demo
 */
export const ProfileScreen = ({ user, language, onLanguageChange, onLogout, onPushMockNotification }) => {
  const [wateringAlerts, setWateringAlerts] = useState(true);
  const [pesticideAlerts, setPesticideAlerts] = useState(true);
  const [fertilizerAlerts, setFertilizerAlerts] = useState(false);

  const t = translations[language] || translations.en;

  const handleTestReminder = () => {
    // Select a random care alert message to display to the user
    const alerts = [
      {
        title: '🌱 Irrigation Reminder',
        message: 'High heat forecast! Ludhiana crops require deep watering this evening.',
        type: 'care'
      },
      {
        title: '⚠️ Blight Risk warning!',
        message: 'Weather detected 88% humidity. Early blight fungal danger is high in Solanaceous fields.',
        type: 'weather'
      },
      {
        title: '🌾 Fertilizing due!',
        message: 'Your Wheat tillers are in active vegetative phase. Apply balanced nitrogen now.',
        type: 'disease'
      }
    ];

    const selected = alerts[Math.floor(Math.random() * alerts.length)];
    onPushMockNotification(selected.title, selected.message, selected.type);
  };

  return (
    <div className="profile-screen-container animate-fade-in" style={{
      padding: '16px 16px 100px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      color: '#ffffff'
    }}>
      <div>
        <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>
          👤 {t.profile}
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
          Manage your farming configurations and settings.
        </p>
      </div>

      {/* 1. Profile information dashboard */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '24px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a5d6a7 0%, #2e7d32 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 4px 12px rgba(46,125,50,0.3)'
          }}>
            👨‍🌾
          </div>
          <div>
            <h3 style={{ margin: '0', fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>
              {user?.name || 'Ramesh Singh'}
            </h3>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: '2px' }}>
              Farmer ID: CG-98214
            </span>
          </div>
        </div>

        {/* Profile specific parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{t.phone}</span>
            <span style={{ fontWeight: '700' }}>{user?.phone || '+91 98765 43210'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{t.location}</span>
            <span style={{ fontWeight: '700' }}>{user?.location || 'Ludhiana, Punjab'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Primary Crops</span>
            <span style={{ fontWeight: '700', color: '#81c784' }}>{user?.crops || 'Tomato, Potato, Wheat'}</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Language Selection Module */}
      <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />

      {/* 3. Notification & Alarm Reminders */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '24px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#81c784', fontWeight: '700', fontSize: '13.5px' }}>
          <Bell size={18} />
          <span>{t.reminders}</span>
        </div>

        {/* Option cards with toggle buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Watering Reminder */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Droplets size={16} style={{ color: '#64b5f6' }} />
              <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.8)' }}>Daily Watering Alerts</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={wateringAlerts} 
                onChange={() => setWateringAlerts(!wateringAlerts)} 
              />
              <span className="slider round"></span>
            </label>
          </div>

          {/* Pesticide Reminder */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <SprayCan size={16} style={{ color: '#ffb74d' }} />
              <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.8)' }}>Preventative Spray Logs</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={pesticideAlerts} 
                onChange={() => setPesticideAlerts(!pesticideAlerts)} 
              />
              <span className="slider round"></span>
            </label>
          </div>

          {/* Fertilizer Reminder */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Leaf size={16} style={{ color: '#81c784' }} />
              <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.8)' }}>Nutrient Boost Timers</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={fertilizerAlerts} 
                onChange={() => setFertilizerAlerts(!fertilizerAlerts)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* 4. Action Push Test button */}
        <button
          onClick={handleTestReminder}
          style={{
            marginTop: '8px',
            padding: '10px',
            borderRadius: '12px',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            background: 'rgba(76, 175, 80, 0.08)',
            color: '#81c784',
            fontSize: '11px',
            fontWeight: '800',
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(76, 175, 80, 0.15)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(76, 175, 80, 0.08)'}
        >
          🔔 Trigger Care Alert Test Notification
        </button>
      </div>

      {/* Logout button */}
      <button
        onClick={onLogout}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '14px',
          border: 'none',
          background: 'rgba(244, 67, 54, 0.12)',
          border: '1px solid rgba(244, 67, 54, 0.25)',
          color: '#ef5350',
          fontWeight: '700',
          fontSize: '12.5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '16px',
          outline: 'none',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(244, 67, 54, 0.2)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(244, 67, 54, 0.12)'}
      >
        <LogOut size={16} />
        <span>{t.logout}</span>
      </button>
    </div>
  );
};
export default ProfileScreen;
