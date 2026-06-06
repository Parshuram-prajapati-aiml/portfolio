import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

/**
 * VoiceAssistant provides text-to-speech accessibility for farmers.
 * @param {Object} props
 * @param {string} props.textToSpeak - The structured text to read aloud
 * @param {string} props.language - The active language code ('en', 'hi', etc.)
 */
export const VoiceAssistant = ({ textToSpeak, language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const t = translations[language] || translations.en;

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
    
    // Cleanup synthesis when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Monitor speaking status
  useEffect(() => {
    const checkStatus = setInterval(() => {
      if ('speechSynthesis' in window) {
        setIsSpeaking(window.speechSynthesis.speaking);
      }
    }, 250);

    return () => clearInterval(checkStatus);
  }, []);

  const handleSpeak = () => {
    if (!supported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Map simple language code to high-quality locale
      const localeMap = {
        en: 'en-US',
        hi: 'hi-IN',
        es: 'es-ES',
        te: 'te-IN',
        pa: 'pa-IN'
      };
      
      utterance.lang = localeMap[language] || 'en-US';
      utterance.rate = 0.95; // Slightly slower speed for clarity
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  if (!supported) return null;

  return (
    <button
      onClick={handleSpeak}
      className={`voice-assistant-btn ${isSpeaking ? 'speaking' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 20px',
        borderRadius: '50px',
        border: isSpeaking ? '2px solid #81c784' : '2px solid rgba(255, 255, 255, 0.1)',
        background: isSpeaking 
          ? 'linear-gradient(135deg, #1b5e20, #2e7d32)' 
          : 'rgba(255, 255, 255, 0.05)',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isSpeaking ? '0 0 20px rgba(76, 175, 80, 0.5)' : 'none',
        outline: 'none',
        userSelect: 'none'
      }}
    >
      {isSpeaking ? (
        <>
          <VolumeX size={18} strokeWidth={2.5} style={{ animation: 'bounce 1s infinite alternate' }} />
          <span>{t.stopSpeech}</span>
          <Sparkles size={14} className="sparkle-icon" style={{ fill: '#ffeb3b', stroke: '#ffeb3b' }} />
        </>
      ) : (
        <>
          <Volume2 size={18} strokeWidth={2} />
          <span>{t.readAloud}</span>
        </>
      )}
    </button>
  );
};
export default VoiceAssistant;
