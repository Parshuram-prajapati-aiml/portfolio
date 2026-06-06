import React, { useState } from 'react';
import { Sprout, Lock, User, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';

/**
 * LoginScreen handles farmer sign-in and account registration.
 * @param {Object} props
 * @param {Function} props.onLoginSuccess - Callback when login finishes successfully
 * @param {string} props.language - The active language code
 */
export const LoginScreen = ({ onLoginSuccess, language }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [fullname, setFullname] = useState('Ramesh Singh');
  const [location, setLocation] = useState('Ludhiana, Punjab');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('ramesh@farmer.com');
  const [password, setPassword] = useState('password123');

  const t = translations[language] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullname && password) {
      onLoginSuccess({
        name: fullname,
        location,
        phone,
        email,
        crops: 'Tomato, Potato, Rice'
      });
    }
  };

  return (
    <div className="login-screen-container" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      color: '#ffffff',
      justifyContent: 'center',
      backgroundImage: 'linear-gradient(180deg, rgba(17, 36, 19, 0.85) 0%, rgba(7, 15, 8, 0.96) 100%), url("/farm_bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Dynamic top agricultural header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #a5d6a7, #2e7d32)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Sprout size={32} style={{ color: '#ffffff' }} />
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: '10px 0 0 0',
          letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #ffffff 60%, #a5d6a7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t.appTitle}
        </h1>
        <p style={{
          margin: '0',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: '1.4',
          maxWidth: '240px'
        }}>
          {t.tagline}
        </p>
      </div>

      {/* Main glassmorphic container form */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '28px',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        {/* Toggle selectors */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '20px'
        }}>
          <button 
            type="button"
            onClick={() => setIsSignup(false)}
            style={{
              flex: '1',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: !isSignup ? 'rgba(76, 175, 80, 0.2)' : 'transparent',
              color: !isSignup ? '#81c784' : 'rgba(255,255,255,0.5)',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {t.login}
          </button>
          <button 
            type="button"
            onClick={() => setIsSignup(true)}
            style={{
              flex: '1',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: isSignup ? 'rgba(76, 175, 80, 0.2)' : 'transparent',
              color: isSignup ? '#81c784' : 'rgba(255,255,255,0.5)',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {t.signup}
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Full Name field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)' }}>{t.fullname}</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', color: 'rgba(255, 255, 255, 0.3)' }} />
              <input 
                type="text" 
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 38px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4caf50'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
              />
            </div>
          </div>

          {/* Signup specific fields */}
          {isSignup && (
            <>
              {/* Location field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)' }}>{t.location}</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '12px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Phone field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)' }}>{t.phone}</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Email field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)' }}>{t.email}</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Password field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)' }}>{t.password}</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', color: 'rgba(255, 255, 255, 0.3)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 38px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4caf50'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            style={{
              padding: '14px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginTop: '8px',
              boxShadow: '0 8px 20px rgba(46, 125, 50, 0.35)',
              transition: 'transform 0.2s, opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = 0.95}
            onMouseLeave={(e) => e.target.style.opacity = 1}
          >
            <span>{isSignup ? t.signup : t.login}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>

      {/* Guest bypass text */}
      <p style={{
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer'
      }} onClick={() => onLoginSuccess({ name: 'Ramesh Singh', location: 'Ludhiana, Punjab', phone: '+91 98765 43210', email: 'ramesh@farmer.com', crops: 'Tomato, Potato, Wheat, Rice, Corn' })}>
        Skip authentication & use demo account
      </p>
    </div>
  );
};
export default LoginScreen;
