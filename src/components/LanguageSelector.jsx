import React from 'react';
import { Languages, Check } from 'lucide-react';
import { translations } from '../data/translations';

/**
 * LanguageSelector allows farmers to choose their preferred localized UI translations.
 * @param {Object} props
 * @param {string} props.currentLanguage - The active language key ('en', 'hi', etc.)
 * @param {Function} props.onLanguageChange - Callback triggers on language selection
 */
export const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const t = translations[currentLanguage] || translations.en;

  const languagesList = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="language-selector-card" style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '16px',
      margin: '10px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '14px',
        color: '#81c784',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        <Languages size={18} />
        <span>{t.languages}</span>
      </div>

      <div className="language-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px'
      }}>
        {languagesList.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '14px',
                border: isActive ? '1.5px solid #4caf50' : '1.5px solid rgba(255, 255, 255, 0.05)',
                background: isActive ? 'rgba(76, 175, 80, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                color: '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.25s ease',
                outline: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ color: isActive ? '#81c784' : '#ffffff' }}>{lang.native}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>{lang.name}</span>
                </div>
              </div>
              {isActive && <Check size={14} strokeWidth={3} style={{ color: '#81c784' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default LanguageSelector;
