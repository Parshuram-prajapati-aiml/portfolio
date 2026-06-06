import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, BookOpen, AlertTriangle, ArrowRight, MessageSquare, ArrowLeft } from 'lucide-react';
import { LeafIllustrator } from '../components/LeafIllustrator';
import { VoiceAssistant } from '../components/VoiceAssistant';
import { translations } from '../data/translations';

/**
 * DiagnosisScreen operates scanning animation and presents AI diagnostics & treatments.
 * @param {Object} props
 * @param {Object} props.scanResult - The completed AI diagnosis object
 * @param {boolean} props.isLoading - Whether the scan animation is active
 * @param {string} props.language - Active language locale code
 * @param {Function} props.onClose - Close and return to home dashboard
 * @param {Function} props.onConsultExpert - Jump to Specialist Chat screen
 */
export const DiagnosisScreen = ({ scanResult, isLoading, language, onClose, onConsultExpert }) => {
  const [scanStageText, setScanStageText] = useState('Initializing Scanner...');
  const t = translations[language] || translations.en;

  // Animate the simulated neural network training logs
  useEffect(() => {
    if (isLoading) {
      const logs = [
        'Connecting Neural Engine...',
        'Loading leaf tensor model...',
        'Extracting leaf venation contours...',
        'Compiling HSL color histograms...',
        'Convolution passes running...',
        'Matching disease templates...',
        'Classification complete!'
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < logs.length) {
          setScanStageText(logs[index]);
          index++;
        }
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="scanning-container animate-fade-in" style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        {/* Animated pulsing leaf container */}
        <div style={{
          position: 'relative',
          width: '220px',
          height: '220px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '32px',
          border: '2px solid rgba(76, 175, 80, 0.3)',
          boxShadow: '0 0 30px rgba(76, 175, 80, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '32px'
        }}>
          {scanResult && <LeafIllustrator svgType={scanResult.svgType} customImageBlob={scanResult.customImageBlob} />}
          
          {/* Laser scanning moving line */}
          <div className="laser-scanner-line" style={{
            position: 'absolute',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, rgba(76,175,80,0) 0%, rgba(76,175,80,1) 50%, rgba(76,175,80,0) 100%)',
            boxShadow: '0 0 15px #81c784, 0 0 5px #81c784',
            animation: 'scanAnimation 2s infinite ease-in-out',
            zIndex: 10
          }} />
        </div>

        <h3 className="animate-pulse" style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 10px 0', color: '#81c784' }}>
          Analyzing Leaf Specimen...
        </h3>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', margin: '0' }}>
          {scanStageText}
        </p>
      </div>
    );
  }

  if (!scanResult) return null;

  const { name, confidence, type, symptoms, causes, organicRemedies, chemicalRemedies, svgType, customImageBlob } = scanResult;
  const isHealthy = type === 'Healthy';

  // Construct a clean descriptive text block for Voice synthesis readout
  const buildReadoutText = () => {
    let text = `Scan completed. Diagnosis is ${name} with AI confidence of ${confidence} percent. `;
    if (isHealthy) {
      text += `Your crop is completely healthy. Organic recommendations are: ${organicRemedies[0]}`;
    } else {
      text += `This is classified as a ${type} infection. Key symptoms include: ${symptoms[0]}. `;
      text += `Organic remedies suggest: ${organicRemedies[0]}. Chemical alternative lists: ${chemicalRemedies[0]}.`;
    }
    return text;
  };

  return (
    <div className="diagnosis-screen-container animate-fade-in" style={{
      padding: '16px 16px 100px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.4)' }}>
          {t.scanCompleted}
        </span>
        <div style={{ width: '36px' }} />
      </div>

      {/* 1. Curated Leaf Render Card */}
      <div style={{
        height: '160px',
        background: isHealthy ? 'linear-gradient(135deg, #1b5e20, #0a220b)' : 'linear-gradient(135deg, #3e2723, #150c0a)',
        borderRadius: '24px',
        border: isHealthy ? '1.5px solid rgba(76, 175, 80, 0.3)' : '1.5px solid rgba(229, 115, 115, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{ width: '110px', height: '110px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', overflow: 'hidden' }}>
          <LeafIllustrator svgType={svgType} customImageBlob={customImageBlob} />
        </div>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{
            alignSelf: 'flex-start',
            fontSize: '9px',
            fontWeight: '800',
            padding: '4px 8px',
            borderRadius: '50px',
            background: isHealthy ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
            color: isHealthy ? '#81c784' : '#ef5350',
            border: isHealthy ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(244, 67, 54, 0.3)',
            textTransform: 'uppercase'
          }}>
            {isHealthy ? t.healthy : t.diseased}
          </span>
          <h2 style={{ margin: '0', fontSize: '18px', fontWeight: '800', color: '#ffffff', lineHeight: '1.2' }}>
            {name}
          </h2>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
            Origin: {type}
          </span>
        </div>
      </div>

      {/* 2. Confidence Indicator and Audio assist */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '20px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
      }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>{t.confidence}</span>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#81c784' }}>{confidence}%</span>
        </div>

        {/* Custom Progress bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{
            width: `${confidence}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4caf50, #81c784)',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(129, 199, 132, 0.5)'
          }} />
        </div>

        {/* Dynamic Speech Assistant component */}
        <VoiceAssistant textToSpeak={buildReadoutText()} language={language} />
      </div>

      {/* 3. Symptoms section */}
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '13px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
          <BookOpen size={16} style={{ color: '#81c784' }} /> {t.symptoms}
        </h3>
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '16px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {symptoms.map((symptom, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#81c784', fontWeight: 'bold', fontSize: '12px' }}>•</span>
              <p style={{ margin: '0', fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                {symptom}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Remedies section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Organic Remedies */}
        <div style={{
          background: 'rgba(76, 175, 80, 0.05)',
          border: '1.5px solid rgba(76, 175, 80, 0.15)',
          borderRadius: '18px',
          padding: '14px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12.5px', color: '#81c784', fontWeight: '850', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🌱 {t.organicRemedy}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {organicRemedies.map((remedy, i) => (
              <div key={i} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.3', paddingLeft: '8px', borderLeft: '2px solid #81c784' }}>
                {remedy}
              </div>
            ))}
          </div>
        </div>

        {/* Chemical Remedies */}
        {!isHealthy && (
          <div style={{
            background: 'rgba(100, 181, 246, 0.04)',
            border: '1.5px solid rgba(100, 181, 246, 0.15)',
            borderRadius: '18px',
            padding: '14px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '12.5px', color: '#64b5f6', fontWeight: '850', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🧪 {t.chemicalRemedy}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {chemicalRemedies.map((remedy, i) => (
                <div key={i} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.3', paddingLeft: '8px', borderLeft: '2px solid #64b5f6' }}>
                  {remedy}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Warning callback & expert consultation link */}
      {!isHealthy && (
        <div 
          onClick={onConsultExpert}
          style={{
            background: 'rgba(244, 67, 54, 0.05)',
            border: '1px dashed rgba(244, 67, 54, 0.3)',
            borderRadius: '16px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} style={{ color: '#ef5350' }} />
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#ef5350' }}>
              Worried about this disease spread?
            </span>
          </div>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#ef5350',
            fontWeight: '800',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}>
            {t.askExpert.split(' ')[0]} <ArrowRight size={12} />
          </button>
        </div>
      )}

      {/* Back to dashboard button */}
      <button
        onClick={onClose}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '14px',
          border: '1.5px solid rgba(255,255,255,0.1)',
          background: 'transparent',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '13px',
          cursor: 'pointer',
          marginTop: '12px'
        }}
      >
        Done
      </button>
    </div>
  );
};
export default DiagnosisScreen;
