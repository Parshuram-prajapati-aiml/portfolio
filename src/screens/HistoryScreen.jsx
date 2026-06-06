import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, ShieldCheck, ShieldAlert, ArrowRight, Search, FileText } from 'lucide-react';
import { getScanHistory, deleteScanFromHistory } from '../utils/aiSimulator';
import { translations } from '../data/translations';
import { LeafIllustrator } from '../components/LeafIllustrator';

/**
 * HistoryScreen displays local diagnostics logs, with filtering and deletion tools.
 * @param {Object} props
 * @param {string} props.language - Active language locale key
 * @param {Function} props.onSelectScan - Open full treatment details for a historical scan
 */
export const HistoryScreen = ({ language, onSelectScan }) => {
  const [historyList, setHistoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[language] || translations.en;

  const loadHistory = () => {
    setHistoryList(getScanHistory());
  };

  // Listen to custom updates (such as auto-saving new scans)
  useEffect(() => {
    loadHistory();
    window.addEventListener('cropguard_history_updated', loadHistory);
    return () => {
      window.removeEventListener('cropguard_history_updated', loadHistory);
    };
  }, []);

  const handleDelete = (e, scanId) => {
    e.stopPropagation(); // Avoid selecting card
    if (confirm("Delete this scan record from your history?")) {
      deleteScanFromHistory(scanId);
      loadHistory();
    }
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  // Filter based on search query
  const filteredHistory = historyList.filter(scan => {
    const nameMatch = scan.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cropMatch = scan.cropId.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || cropMatch;
  });

  return (
    <div className="history-screen-container animate-fade-in" style={{
      padding: '16px 16px 100px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div>
        <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>
          📂 {t.scanHistory}
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
          Review your previous botanical diagnostics offline.
        </p>
      </div>

      {/* 1. Search Query Box */}
      {historyList.length > 0 && (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', color: 'rgba(255, 255, 255, 0.3)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop or disease..."
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '12px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4caf50'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>
      )}

      {/* 2. Scanning Lists */}
      {filteredHistory.length === 0 ? (
        <div style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '48px 24px',
          background: 'rgba(255,255,255,0.01)',
          borderRadius: '24px',
          border: '1px dashed rgba(255,255,255,0.05)',
          marginTop: '20px',
          gap: '14px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.2)'
          }}>
            <FileText size={28} />
          </div>
          <div>
            <h4 style={{ margin: '0', fontSize: '13.5px', fontWeight: '700', color: '#ffffff' }}>
              {historyList.length === 0 ? t.noHistory.split('.')[0] : 'No matching scans found'}
            </h4>
            <p style={{ margin: '6px 0 0 0', fontSize: '10.5px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.4' }}>
              {historyList.length === 0 ? t.noHistory.split('.')[1] : 'Try searching for another keyword.'}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredHistory.map((scan) => {
            const isHealthy = scan.diseaseKey.endsWith('_healthy');
            return (
              <div
                key={scan.id}
                onClick={() => onSelectScan(scan)}
                className="history-log-card"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                {/* Small leaf avatar preview */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: isHealthy ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  border: isHealthy ? '1px solid rgba(76, 175, 80, 0.2)' : '1px solid rgba(244, 67, 54, 0.2)',
                  overflow: 'hidden',
                  flexShrink: '0'
                }}>
                  <LeafIllustrator svgType={scan.svgType} customImageBlob={scan.customImageBlob} />
                </div>

                {/* Scan parameters details */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '9px', fontWeight: '850', color: '#81c784', textTransform: 'uppercase' }}>
                      {scan.cropId}
                    </span>
                    <span style={{
                      fontSize: '8px',
                      background: isHealthy ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
                      color: isHealthy ? '#81c784' : '#ef5350',
                      padding: '2px 5px',
                      borderRadius: '50px',
                      fontWeight: '700'
                    }}>
                      {scan.confidence}%
                    </span>
                  </div>
                  
                  <h4 style={{
                    margin: '0',
                    fontSize: '12.5px',
                    fontWeight: '750',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}>
                    {scan.name}
                  </h4>

                  <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={10} /> {formatDate(scan.timestamp)}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => handleDelete(e, scan.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ef5350'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.2)'}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default HistoryScreen;
