import React from 'react';
import { Sprout, Sun, CloudRain, Droplets, ShieldAlert, Sparkles, PhoneCall, ChevronRight, User } from 'lucide-react';
import { cropCategories } from '../data/cropData';
import { translations } from '../data/translations';

/**
 * DashboardScreen represents the central landing page for farmers.
 * @param {Object} props
 * @param {Object} props.user - Logged in farmer details
 * @param {string} props.language - The active language code
 * @param {Function} props.onSelectCrop - Triggers when clicking a crop category card
 * @param {Function} props.onNavigate - Routine to jump between screens
 * @param {Array} props.history - List of previous scan diagnoses
 */

/**
 * DashboardScreen represents the central landing page for farmers.
 */
export const DashboardScreen = ({ user, language, onSelectCrop, onNavigate, history }) => {
  const t = translations[language] || translations.en;

  // Derive simple statistics
  const totalScans = history.length;
  const healthyScans = history.filter(s => s.diseaseKey.endsWith('_healthy')).length;
  const healthPercent = totalScans > 0 ? Math.round((healthyScans / totalScans) * 100) : 100;

  return (
    <div className="dashboard-screen-container animate-fade-in" style={{
      paddingBottom: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Welcome Banner Card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(12, 25, 14, 0.4) 100%)',
        border: '1px solid rgba(76, 175, 80, 0.15)',
        borderRadius: '24px',
        padding: '20px 24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(76, 175, 80, 0.15)',
            border: '1.5px solid rgba(76, 175, 80, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#81c784',
            fontSize: '20px'
          }}>
            👨‍🌾
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#81c784', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t.welcome}
            </span>
            <h3 style={{ margin: '2px 0 0 0', fontSize: '18px', color: '#ffffff', fontWeight: '800' }}>
              {user?.name || 'Farmer'}
            </h3>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{
            fontSize: '11px',
            background: 'rgba(129, 199, 132, 0.12)',
            color: '#81c784',
            border: '1px solid rgba(129, 199, 132, 0.2)',
            padding: '6px 12px',
            borderRadius: '50px',
            fontWeight: '700',
            display: 'inline-block'
          }}>
            📍 {user?.location || 'Ludhiana, Punjab'}
          </span>
        </div>
      </div>

      {/* Responsive Two Column Split Layout */}
      <div className="widescreen-grid-2col" style={{ alignItems: 'start' }}>
        
        {/* Left Column: Crop Categories Selection Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontSize: '15px', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🌿</span> {t.selectCrop}
            </h3>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>
              Active categories: {cropCategories.length}
            </span>
          </div>

          <div className="crop-categories-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px'
          }}>
            {cropCategories.map((crop) => (
              <button
                key={crop.id}
                onClick={() => onSelectCrop(crop.id)}
                className="crop-card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '18px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '20px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none'
                }}
              >
                <span style={{
                  fontSize: '32px',
                  marginBottom: '12px',
                  filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))'
                }}>{crop.icon}</span>
                
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>{crop.name}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', fontStyle: 'italic', marginTop: '2px' }}>
                  {crop.scientific}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Advisory panels, stats & Expert contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Weather Advisory Card */}
          <div style={{
            background: 'linear-gradient(135deg, #102613 0%, #061007 100%)',
            border: '1.5px solid rgba(76, 175, 80, 0.25)',
            borderRadius: '24px',
            padding: '20px',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 235, 59, 0.15)',
              border: '1px solid rgba(255, 235, 59, 0.3)',
              padding: '4px 10px',
              borderRadius: '50px',
              fontSize: '9px',
              fontWeight: '800',
              color: '#ffeb3b',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={10} fill="#ffeb3b" />
              ADVISORY
            </div>

            <h3 style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#81c784', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              ☀️ {t.weatherAdvisory}
            </h3>

            {/* Meteorological Grid parameters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '16px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Sun size={20} style={{ color: '#ffb74d' }} />
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff' }}>31.5°C</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Temp</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Droplets size={20} style={{ color: '#64b5f6' }} />
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff' }}>88%</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Humidity</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <CloudRain size={20} style={{ color: '#90a4ae' }} />
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff' }}>10%</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Rain Risk</span>
              </div>
            </div>

            {/* Fungal alert warning block */}
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              borderRadius: '16px',
              padding: '12px 14px'
            }}>
              <ShieldAlert size={20} style={{ color: '#ef5350', flexShrink: '0', marginTop: '1px' }} />
              <p style={{ margin: '0', fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.4' }}>
                <strong>{t.highFungalRisk}</strong> {t.badForSpraying}
              </p>
            </div>
          </div>

          {/* Farmer Analytics Stat widgets */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '24px',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#81c784' }}>{totalScans}</span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontWeight: '700', textTransform: 'uppercase' }}>
                {t.totalScans}
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffeb3b' }}>{healthPercent}%</span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontWeight: '700', textTransform: 'uppercase' }}>
                Health Index
              </span>
            </div>
          </div>

          {/* Quick Call Expert callback consultation card */}
          <div 
            onClick={() => onNavigate('expert')}
            style={{
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(76, 175, 80, 0.02) 100%)',
              border: '1px dashed rgba(76, 175, 80, 0.3)',
              borderRadius: '24px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.25s'
            }}
            className="crop-card-interactive"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                background: 'rgba(76, 175, 80, 0.15)',
                borderRadius: '14px',
                padding: '10px',
                color: '#81c784'
              }}>
                <PhoneCall size={20} />
              </div>
              <div>
                <h4 style={{ margin: '0', fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>
                  {t.requestCallback}
                </h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '10.5px', color: 'rgba(255,255,255,0.5)' }}>
                  Connect with botanical pathologists
                </p>
              </div>
            </div>
            <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.3)' }} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
