import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, ArrowLeft, Image as ImageIcon, Video, RefreshCw } from 'lucide-react';
import { sampleLeaves } from '../data/sampleImages';
import { translations } from '../data/translations';
import { LeafIllustrator } from '../components/LeafIllustrator';

/**
 * CameraScreen manages uploading files, capturing webcams, or selecting curated leaves to scan.
 * @param {Object} props
 * @param {string} props.cropId - Selected crop ID ('tomato', 'potato', etc.)
 * @param {string} props.language - The active language code
 * @param {Function} props.onBack - Go back to Dashboard
 * @param {Function} props.onStartAnalysis - Launch the AI prediction
 */
export const CameraScreen = ({ cropId, language, onBack, onStartAnalysis }) => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const videoRef = useRef(null);
  const t = translations[language] || translations.en;

  // Filter curated samples for this crop
  const cropSamples = sampleLeaves.filter(leaf => leaf.cropId === cropId);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [cameraStream]);

  const startCamera = async () => {
    try {
      setSelectedSample(null);
      setUploadedFile(null);
      setCapturedImage(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 400, height: 400 }
      });
      setCameraStream(stream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Webcam access declined or not supported. Falling back to specimen gallery.");
      alert("Webcam is not available or permission denied. Please use the 'Sample Leaf Specimen Gallery' below or upload an image file!");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 400;
      canvas.height = videoRef.current.videoHeight || 400;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedSample(null);
      setCapturedImage(null);
      setUploadedFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedSample(null);
      setCapturedImage(null);
      setUploadedFile(file);
    }
  };

  const handleSelectSample = (sample) => {
    setUploadedFile(null);
    setCapturedImage(null);
    setSelectedSample(sample);
  };

  const handleScanAction = () => {
    if (selectedSample) {
      onStartAnalysis(cropId, selectedSample.id, null);
    } else if (uploadedFile) {
      onStartAnalysis(cropId, null, uploadedFile);
    } else if (capturedImage) {
      onStartAnalysis(cropId, null, capturedImage);
    }
  };

  const isReadyToScan = selectedSample || uploadedFile || capturedImage;

  return (
    <div className="camera-screen-container animate-fade-in" style={{
      padding: '16px 16px 100px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Top action header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={onBack} 
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
        <div>
          <h2 style={{ margin: '0', fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>
            {t.startScan}
          </h2>
          <span style={{ fontSize: '11px', color: '#81c784', textTransform: 'capitalize', fontWeight: '600' }}>
            Category: {cropId}
          </span>
        </div>
      </div>

      {/* 1. Main scanning lens view box */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{
          height: '280px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: dragActive 
            ? '3px dashed #4caf50' 
            : '2px dashed rgba(76, 175, 80, 0.3)',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Dynamic content rendering inside view lens */}
        {cameraActive ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Viewfinder target box */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              border: '2px solid #81c784',
              borderRadius: '20px',
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)',
              pointerEvents: 'none'
            }} />
            <button 
              onClick={capturePhoto}
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '12px 24px',
                borderRadius: '50px',
                border: 'none',
                background: '#4caf50',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(76,175,80,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Video size={14} /> Capture Leaf
            </button>
          </div>
        ) : capturedImage ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button 
              onClick={startCamera}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                padding: '6px',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        ) : uploadedFile ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src={URL.createObjectURL(uploadedFile)} 
              alt="Uploaded" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <button 
              onClick={() => setUploadedFile(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                padding: '6px',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        ) : selectedSample ? (
          <div style={{ width: '100%', height: '100%', background: selectedSample.bgGradient, position: 'relative' }}>
            <LeafIllustrator svgType={selectedSample.svgType} />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              padding: '6px 10px',
              background: 'rgba(0,0,0,0.7)',
              borderRadius: '8px',
              fontSize: '10px',
              color: '#81c784',
              fontWeight: '700'
            }}>
              ⭐ Curved Specimen: {selectedSample.name.split(' - ')[1]}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <ImageIcon size={38} style={{ color: 'rgba(76, 175, 80, 0.4)' }} />
            <p style={{ margin: '0', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              Drag & Drop leaf photo here or
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <label 
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Upload size={12} /> {t.uploadPhoto.split(' ')[0]}
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
              <button 
                onClick={startCamera}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: 'rgba(76, 175, 80, 0.15)',
                  color: '#81c784',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: '1px solid rgba(76, 175, 80, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Camera size={12} /> {t.takePhoto.split(' ')[0]}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Interactive analysis trigger */}
      {isReadyToScan && (
        <button
          onClick={handleScanAction}
          className="scan-trigger-btn animate-pulse"
          style={{
            padding: '14px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.4)',
            letterSpacing: '0.5px'
          }}
        >
          🔍 Run AI Diagnosis Scan
        </button>
      )}

      {/* 3. Curated Sample Leaves Specimen Gallery */}
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.8)' }}>
          🧪 Curated Test Specimen Gallery
        </h3>
        <p style={{ margin: '0 0 12px 0', fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.4' }}>
          Select a mock specimen leaf to immediately load it into the neural-net scanner above and verify the diagnosis reports.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px'
        }}>
          {cropSamples.map((sample) => {
            const isActive = selectedSample?.id === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                style={{
                  padding: '10px',
                  borderRadius: '14px',
                  border: isActive ? '2px solid #81c784' : '1.5px solid rgba(255,255,255,0.04)',
                  background: isActive ? 'rgba(76, 175, 80, 0.12)' : 'rgba(255,255,255,0.02)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                {/* Micro leaf mini-preview */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: sample.bgGradient,
                  flexShrink: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LeafIllustrator svgType={sample.svgType} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'hidden' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {sample.name.split(' - ')[1]}
                  </span>
                  <span style={{ 
                    fontSize: '8px', 
                    fontWeight: '800', 
                    color: sample.difficulty === 'Optimal' ? '#81c784' : sample.difficulty === 'Critical' ? '#ef5350' : '#ffb74d'
                  }}>
                    {sample.difficulty}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CameraScreen;
