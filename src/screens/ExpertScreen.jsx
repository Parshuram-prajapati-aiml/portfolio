import React, { useState, useEffect, useRef } from 'react';
import { Send, PhoneCall, Check, User, ArrowLeft, Loader } from 'lucide-react';
import { translations } from '../data/translations';

/**
 * ExpertScreen handles mock agricultural specialist chat and callback requests.
 * @param {Object} props
 * @param {Object} props.user - Logged-in farmer parameters
 * @param {string} props.language - Active language code
 * @param {Function} props.onBack - Routine to jump back to dashboard
 */
export const ExpertScreen = ({ user, language, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);
  
  const chatEndRef = useRef(null);
  const t = translations[language] || translations.en;

  // Pre-load conversational scientist intro
  useEffect(() => {
    setMessages([
      {
        id: 'msg_1',
        sender: 'expert',
        text: `Namaste ${user?.name || 'Farmer'}! I am ${t.expertName}, a senior ${t.expertTitle.split(',')[0]} at the ${t.expertTitle.split(',')[1]}. I am here to help you rescue your crops. I noticed your recent scans. Please let me know what symptoms you are seeing or if you need an organic treatment recipe!`,
        time: 'Just now'
      }
    ]);
  }, [user, language]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: 'msg_' + Date.now(),
      sender: 'farmer',
      text: inputValue,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart plant pathologist replies after 1.5 seconds
    setTimeout(() => {
      let expertText = "That's an excellent question! For solanaceous crops (tomatoes/potatoes), I strongly recommend maintaining dry foliage. Drip irrigation is highly preferred over overhead watering. If fungal blight is expanding, apply Copper Oxychloride (3 grams per Liter of water) immediately.";

      // Custom keywords replies
      const textLower = userMessage.text.toLowerCase();
      if (textLower.includes('organic') || textLower.includes('neem') || textLower.includes('जैविक')) {
        expertText = "Organic approach is highly effective! Spray 5% Neem Seed Kernel Extract (NSKE) or spray diluted liquid seaweed fertilizer to boost crop resistance. Ensure you pluck off the infected lower leaves up to 12 inches high to stop fungal spores splashing.";
      } else if (textLower.includes('rice') || textLower.includes('blast') || textLower.includes('ধান')) {
        expertText = "Ah, Rice Blast can spread quickly in high humidity. Do not apply excessive nitrogen fertilizer as it softens leaf tissues. Apply Silicon rich fertilizer to harden cell walls, or spray Tricyclazole fungicide (0.6g/Liter of water) preventatively.";
      } else if (textLower.includes('rust') || textLower.includes('wheat') || textLower.includes('गेहूं')) {
        expertText = "Wheat Stripe Rust requires cold temperatures to spread. Dust elements of Sulfur or spray Propiconazole (25 EC) at 1 ml per Liter of water as soon as yellow stripes appear. Avoid dense seed sowing to allow proper sunlight aeration.";
      }

      const expertReply = {
        id: 'msg_reply_' + Date.now(),
        sender: 'expert',
        text: expertText,
        time: 'Just now'
      };

      setIsTyping(false);
      setMessages(prev => [...prev, expertReply]);
    }, 1500);
  };

  const handleRequestCallback = () => {
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackSent(false);
    }, 8000); // Reset alert after 8s
  };

  return (
    <div className="expert-screen-container animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      color: '#ffffff',
      position: 'relative'
    }}>
      {/* 1. Header Scientist Banner */}
      <div style={{
        padding: '16px 16px 12px 16px',
        background: 'rgba(18, 30, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={onBack} 
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
          </button>
          
          {/* Avatar frame */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a5d6a7, #1b5e20)',
              border: '1.5px solid #81c784',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              👨‍🔬
            </div>
            {/* Active online dot */}
            <span style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4caf50',
              border: '1.5px solid #122514'
            }} />
          </div>

          <div>
            <h3 style={{ margin: '0', fontSize: '13px', fontWeight: '800', color: '#ffffff' }}>
              {t.expertName}
            </h3>
            <span style={{ fontSize: '9px', color: '#81c784', fontWeight: '600' }}>
              Online • Pathologist
            </span>
          </div>
        </div>

        {/* Action Callback Trigger */}
        <button
          onClick={handleRequestCallback}
          style={{
            padding: '8px 12px',
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(76, 175, 80, 0.15)',
            color: '#81c784',
            fontSize: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1.5px solid rgba(76,175,80,0.25)'
          }}
        >
          <PhoneCall size={12} />
          <span>Call</span>
        </button>
      </div>

      {/* Callback request Alert popup */}
      {callbackSent && (
        <div className="callback-alert-popup animate-slide-down" style={{
          position: 'absolute',
          top: '70px',
          left: '12px',
          right: '12px',
          background: 'rgba(76, 175, 80, 0.95)',
          color: '#ffffff',
          padding: '12px 14px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 9999
        }}>
          <Check size={16} strokeWidth={3} />
          <span>
            {t.callbackRequested} ({user?.phone || '+91 98765 43210'})
          </span>
        </div>
      )}

      {/* 2. Scrollable Messages Chat Log */}
      <div className="chat-messages-container" style={{
        flex: '1',
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        scrollbarWidth: 'none'
      }}>
        {messages.map((msg) => {
          const isExpert = msg.sender === 'expert';
          return (
            <div 
              key={msg.id} 
              style={{
                alignSelf: isExpert ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{
                background: isExpert ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                border: isExpert ? '1px solid rgba(255,255,255,0.06)' : 'none',
                padding: '12px 14px',
                borderRadius: isExpert ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                fontSize: '12px',
                lineHeight: '1.45',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {msg.text}
              </div>
              <span style={{ 
                fontSize: '8px', 
                color: 'rgba(255,255,255,0.3)', 
                alignSelf: isExpert ? 'flex-start' : 'flex-end',
                padding: '0 4px'
              }}>
                {msg.time}
              </span>
            </div>
          );
        })}

        {/* Dynamic Typing bubble indicator */}
        {isTyping && (
          <div style={{
            alignSelf: 'flex-start',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 14px',
            borderRadius: '18px 18px 18px 4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Loader size={12} className="animate-spin" style={{ color: '#81c784' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
              Scientist is typing advice...
            </span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* 3. Text Box Input Form */}
      <form 
        onSubmit={handleSendMessage}
        style={{
          padding: '12px 16px 90px 16px', // Clear tabs space at bottom
          background: 'rgba(18, 30, 20, 0.9)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t.typeMessage}
          style={{
            flex: '1',
            padding: '12px 16px',
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            color: '#ffffff',
            fontSize: '12.5px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4caf50'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
        />
        <button
          type="submit"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(46,125,50,0.3)',
            flexShrink: '0'
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
export default ExpertScreen;
