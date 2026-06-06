import React from 'react';

/**
 * Renders high-fidelity, customized SVG vector drawings of healthy or diseased plant leaves.
 * @param {Object} props
 * @param {string} props.svgType - The design type of the leaf
 * @param {string} [props.className] - Optional custom CSS classes
 * @param {string} [props.customImageBlob] - Optional base64 or blob URL for uploaded images
 */
export const LeafIllustrator = ({ svgType, className = '', customImageBlob }) => {
  // If it's a custom uploaded image, render the preview with a high-tech AI glowing scanner ring
  if (svgType === 'custom_uploaded' && customImageBlob) {
    return (
      <div className={`leaf-preview-container ${className}`} style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '24px',
        border: '3px solid rgba(76, 175, 80, 0.4)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        background: '#122514'
      }}>
        <img 
          src={customImageBlob} 
          alt="Uploaded leaf" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(1.05) brightness(0.98)'
          }}
        />
        {/* Holographic AI target grid overlay */}
        <div style={{
          position: 'absolute',
          inset: '0',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          background: 'radial-gradient(circle, transparent 40%, rgba(18, 37, 20, 0.5) 100%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          padding: '6px 12px',
          background: 'rgba(0, 0, 0, 0.75)',
          borderRadius: '50px',
          fontSize: '11px',
          color: '#81c784',
          border: '1px solid #4caf50',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backdropFilter: 'blur(4px)'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#81c784',
            animation: 'pulse 1.5s infinite'
          }} />
          CAMERA UPLOAD
        </div>
      </div>
    );
  }

  // Draw pure SVG vector art for our leaf samples
  const renderLeafSVG = () => {
    switch (svgType) {
      // 1. BROAD HEALTHY TOMATO/POTATO LEAF
      case 'healthy_broad':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="healthyBroadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#81c784" />
                <stop offset="50%" stopColor="#4caf50" />
                <stop offset="100%" stopColor="#1b5e20" />
              </linearGradient>
              <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a5d6a7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#388e3c" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Stem */}
            <path d="M 100 190 Q 95 150 100 100" stroke="#33691e" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Main Leaf Body */}
            <path 
              d="M 100 20 C 130 50 170 80 150 130 C 135 160 110 175 100 180 C 90 175 65 160 50 130 C 30 80 70 50 100 20 Z" 
              fill="url(#healthyBroadGrad)" 
              filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.15))"
            />
            {/* Center Midrib */}
            <path d="M 100 20 Q 98 100 100 180" stroke="url(#veinGrad)" strokeWidth="3" fill="none" />
            {/* Veins */}
            <path d="M 100 60 Q 130 45 140 60" stroke="url(#veinGrad)" strokeWidth="2.5" fill="none" />
            <path d="M 100 60 Q 70 45 60 60" stroke="url(#veinGrad)" strokeWidth="2.5" fill="none" />
            <path d="M 100 95 Q 135 85 148 105" stroke="url(#veinGrad)" strokeWidth="2" fill="none" />
            <path d="M 100 95 Q 65 85 52 105" stroke="url(#veinGrad)" strokeWidth="2" fill="none" />
            <path d="M 100 130 Q 130 125 138 142" stroke="url(#veinGrad)" strokeWidth="2" fill="none" />
            <path d="M 100 130 Q 70 125 62 142" stroke="url(#veinGrad)" strokeWidth="2" fill="none" />
            {/* Dew drop */}
            <circle cx="120" cy="80" r="4" fill="rgba(255,255,255,0.7)" />
            <circle cx="122" cy="78" r="1.5" fill="white" />
          </svg>
        );

      // 2. TOMATO/POTATO EARLY BLIGHT (TARGET SPOTS)
      case 'early_blight':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="blightLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#aed581" />
                <stop offset="70%" stopColor="#689f38" />
                <stop offset="100%" stopColor="#33691e" />
              </linearGradient>
              {/* Target Spot Gradients */}
              <radialGradient id="targetSpot">
                <stop offset="0%" stopColor="#3e2723" />
                <stop offset="30%" stopColor="#4e342e" />
                <stop offset="60%" stopColor="#795548" />
                <stop offset="85%" stopColor="#ffe082" /> {/* yellow margin */}
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Stem */}
            <path d="M 100 190 Q 95 150 100 100" stroke="#33691e" strokeWidth="6" fill="none" />
            {/* Leaf Body with slightly yellowed withered edges */}
            <path 
              d="M 100 20 C 130 50 170 80 150 130 C 135 160 110 175 100 180 C 90 175 65 160 50 130 C 30 80 70 50 100 20 Z" 
              fill="url(#blightLeafGrad)" 
            />
            {/* Veins */}
            <path d="M 100 20 Q 98 100 100 180" stroke="#9ccc65" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
            <path d="M 100 60 Q 130 45 140 60" stroke="#9ccc65" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
            <path d="M 100 60 Q 70 45 60 60" stroke="#9ccc65" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
            <path d="M 100 95 Q 135 85 148 105" stroke="#9ccc65" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
            <path d="M 100 95 Q 65 85 52 105" stroke="#9ccc65" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
            
            {/* Early Blight Target Spot 1 */}
            <circle cx="115" cy="70" r="18" fill="url(#targetSpot)" />
            {/* Target concentric rings detail */}
            <circle cx="115" cy="70" r="12" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
            <circle cx="115" cy="70" r="6" stroke="rgba(0,0,0,0.4)" strokeWidth="1" fill="none" />

            {/* Target Spot 2 */}
            <circle cx="75" cy="110" r="14" fill="url(#targetSpot)" />
            <circle cx="75" cy="110" r="9" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
            <circle cx="75" cy="110" r="4" stroke="rgba(0,0,0,0.4)" strokeWidth="1" fill="none" />

            {/* Target Spot 3 (smaller) */}
            <circle cx="130" cy="125" r="10" fill="url(#targetSpot)" />
            
            {/* Yellow dying tip */}
            <path d="M 100 20 Q 110 35 100 45 C 95 38 90 30 100 20 Z" fill="#ffe082" opacity="0.8" />
          </svg>
        );

      // 3. TOMATO/POTATO LATE BLIGHT (GREY MOLD ROT)
      case 'late_blight':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="lateLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#aed581" />
                <stop offset="60%" stopColor="#4caf50" />
                <stop offset="100%" stopColor="#2e7d32" />
              </linearGradient>
              {/* Fuzzy Rot Gradient */}
              <radialGradient id="rotPatch">
                <stop offset="0%" stopColor="#212121" />
                <stop offset="45%" stopColor="#4e342e" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#b0bec5" stopOpacity="0.95" /> {/* Grey fuzzy mold limit */}
                <stop offset="90%" stopColor="#dce775" stopOpacity="0.85" /> {/* yellow border */}
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Stem */}
            <path d="M 100 190 Q 95 150 100 100" stroke="#33691e" strokeWidth="6" fill="none" />
            {/* Leaf Body */}
            <path 
              d="M 100 20 C 130 50 170 80 150 130 C 135 160 110 175 100 180 C 90 175 65 160 50 130 C 30 80 70 50 100 20 Z" 
              fill="url(#lateLeafGrad)" 
            />
            {/* Large wet rot lesion expanding from edges */}
            <path d="M 150 100 C 140 100 110 110 115 130 C 120 145 135 150 145 140 C 158 128 165 110 150 100 Z" fill="url(#rotPatch)" opacity="0.95" />
            
            {/* Rot lesion at the tip */}
            <path d="M 100 20 C 115 35 120 50 100 65 C 80 50 85 35 100 20 Z" fill="url(#rotPatch)" opacity="0.92" />
            
            {/* Smaller spot */}
            <circle cx="70" cy="90" r="16" fill="url(#rotPatch)" />
            
            {/* Soft veins */}
            <path d="M 100 20 Q 98 100 100 180" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          </svg>
        );

      // 4. TOMATO MOSAIC VIRUS (MOTTLED & CRINKLED EDGES)
      case 'mosaic':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <pattern id="mottlePattern" width="40" height="40" patternUnits="userSpaceOnUse">
                {/* Spotted mosaic background */}
                <rect width="40" height="40" fill="#aed581" />
                <path d="M 0 0 Q 15 20 20 0 Z" fill="#d4e157" opacity="0.9" />
                <circle cx="30" cy="10" r="12" fill="#c0ca33" opacity="0.8" />
                <path d="M 10 30 Q 30 20 40 40 Z" fill="#689f38" opacity="0.85" />
                <circle cx="5" cy="35" r="8" fill="#d4e157" opacity="0.9" />
                <circle cx="25" cy="30" r="6" fill="#f4ff81" opacity="0.7" />
              </pattern>
            </defs>
            {/* Stem */}
            <path d="M 100 190 Q 95 150 100 100" stroke="#33691e" strokeWidth="6" fill="none" />
            {/* Highly crinkled leaf shape */}
            <path 
              d="M 100 22 C 115 38 128 42 125 55 C 122 68 148 70 145 88 C 142 105 158 115 142 135 C 132 148 115 158 100 178 C 85 158 68 148 58 135 C 42 115 58 105 55 88 C 52 70 78 68 75 55 C 72 42 85 38 100 22 Z" 
              fill="url(#mottlePattern)" 
              filter="drop-shadow(0 6px 12px rgba(0,0,0,0.18))"
            />
            {/* Deep distorted leaf veins */}
            <path d="M 100 22 Q 95 95 100 178" stroke="#558b2f" strokeWidth="3" fill="none" />
            <path d="M 100 55 C 120 50 128 62 138 72" stroke="#558b2f" strokeWidth="2" fill="none" />
            <path d="M 100 55 C 80 50 72 62 62 72" stroke="#558b2f" strokeWidth="2" fill="none" />
            <path d="M 100 88 C 125 85 132 102 142 112" stroke="#558b2f" strokeWidth="2" fill="none" />
            <path d="M 100 88 C 75 85 68 102 58 112" stroke="#558b2f" strokeWidth="2" fill="none" />
            <path d="M 100 125 C 118 125 125 138 130 144" stroke="#558b2f" strokeWidth="2.5" fill="none" />
            <path d="M 100 125 C 82 125 75 138 70 144" stroke="#558b2f" strokeWidth="2.5" fill="none" />
          </svg>
        );

      // 5. SLENDER GRASSY HEALTHY LEAF (WHEAT/RICE)
      case 'slender_healthy':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="slenderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#81c784" />
                <stop offset="40%" stopColor="#4caf50" />
                <stop offset="100%" stopColor="#2e7d32" />
              </linearGradient>
            </defs>
            {/* Grassy blade with beautiful sweeping bend */}
            <path 
              d="M 90 195 Q 85 100 130 20 Q 105 70 102 195 Z" 
              fill="url(#slenderGrad)" 
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.12))"
            />
            {/* Long parallel veins */}
            <path d="M 96 195 Q 92 100 122 30" stroke="#a5d6a7" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 92 195 Q 88 110 112 55" stroke="#a5d6a7" strokeWidth="1.2" fill="none" opacity="0.4" />
            <path d="M 99 195 Q 96 95 126 35" stroke="#1b5e20" strokeWidth="1" fill="none" opacity="0.3" />
          </svg>
        );

      // 6. RICE BLAST (DIAMOND/SPINDLE LESIONS)
      case 'rice_blast':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="blastBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c5e1a5" />
                <stop offset="60%" stopColor="#8bc34a" />
                <stop offset="100%" stopColor="#558b2f" />
              </linearGradient>
              {/* Spindle spot */}
              <linearGradient id="spindleSpot" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffe082" />
                <stop offset="25%" stopColor="#795548" />
                <stop offset="50%" stopColor="#cfd8dc" /> {/* ash center */}
                <stop offset="75%" stopColor="#795548" />
                <stop offset="100%" stopColor="#ffe082" />
              </linearGradient>
            </defs>
            {/* Leaf Blade */}
            <path 
              d="M 90 195 Q 85 100 130 20 Q 105 70 102 195 Z" 
              fill="url(#blastBg)" 
            />
            {/* Veins */}
            <path d="M 96 195 Q 92 100 122 30" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
            
            {/* Spindle Blast Lesion 1 (Center) */}
            <g transform="translate(100, 95) rotate(-25)">
              <path d="M 0 -15 C 6 -5 6 5 0 15 C -6 5 -6 -5 0 -15 Z" fill="url(#spindleSpot)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
              <line x1="0" y1="-15" x2="0" y2="15" stroke="#3e2723" strokeWidth="0.8" />
            </g>

            {/* Spindle Blast Lesion 2 (Lower Left) */}
            <g transform="translate(93, 140) rotate(-15) scale(0.7)">
              <path d="M 0 -15 C 6 -5 6 5 0 15 C -6 5 -6 -5 0 -15 Z" fill="url(#spindleSpot)" />
            </g>

            {/* Spindle Blast Lesion 3 (Upper Right) */}
            <g transform="translate(112, 60) rotate(-35) scale(0.8)">
              <path d="M 0 -15 C 6 -5 6 5 0 15 C -6 5 -6 -5 0 -15 Z" fill="url(#spindleSpot)" />
            </g>
          </svg>
        );

      // 7. RICE BROWN SPOT (SESAME SPOT SPECKLES)
      case 'rice_brown_spot':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="brownSpotBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dce775" />
                <stop offset="50%" stopColor="#aed581" />
                <stop offset="100%" stopColor="#689f38" />
              </linearGradient>
            </defs>
            {/* Leaf Blade */}
            <path 
              d="M 90 195 Q 85 100 130 20 Q 105 70 102 195 Z" 
              fill="url(#brownSpotBg)" 
            />
            {/* Veins */}
            <path d="M 96 195 Q 92 100 122 30" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />

            {/* Dozens of small brown sesame freckles with soft yellow borders */}
            {/* Row 1 */}
            <circle cx="106" cy="65" r="3" fill="#3e2723" stroke="#ffeb3b" strokeWidth="0.8" />
            <circle cx="114" cy="78" r="2" fill="#4e342e" stroke="#ffeb3b" strokeWidth="0.5" />
            <circle cx="101" cy="95" r="4" fill="#3e2723" stroke="#ffeb3b" strokeWidth="1" />
            <circle cx="97" cy="115" r="2.5" fill="#4e342e" stroke="#ffeb3b" strokeWidth="0.8" />
            <circle cx="98" cy="142" r="3" fill="#3e2723" stroke="#ffeb3b" strokeWidth="0.8" />
            <circle cx="103" cy="165" r="2" fill="#3e2723" />
            
            {/* Speckles on margins */}
            <ellipse cx="120" cy="50" rx="1.5" ry="3" fill="#5d4037" transform="rotate(-30, 120, 50)" />
            <ellipse cx="94" cy="128" rx="2" ry="4" fill="#5d4037" transform="rotate(-15, 94, 128)" />
            <ellipse cx="100" cy="82" rx="1.5" ry="3.5" fill="#3e2723" />
          </svg>
        );

      // 8. WHEAT YELLOW RUST (PARALLEL GOLD STRIPES)
      case 'wheat_yellow_rust':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="wheatRustBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dce775" />
                <stop offset="60%" stopColor="#9ccc65" />
                <stop offset="100%" stopColor="#558b2f" />
              </linearGradient>
            </defs>
            {/* Leaf Blade */}
            <path 
              d="M 90 195 Q 85 100 130 20 Q 105 70 102 195 Z" 
              fill="url(#wheatRustBg)" 
            />

            {/* Parallel vertical lines of yellow-orange glowing rust pustules */}
            <g opacity="0.9">
              {/* Stripe 1 */}
              <line x1="97" y1="60" x2="99" y2="185" stroke="#fbc02d" strokeWidth="2.5" strokeDasharray="4,6,1,5" strokeLinecap="round" />
              <line x1="97" y1="60" x2="99" y2="185" stroke="#ff8f00" strokeWidth="1.2" strokeDasharray="3,7,2,4" />

              {/* Stripe 2 */}
              <line x1="104" y1="40" x2="106" y2="170" stroke="#fbc02d" strokeWidth="2.2" strokeDasharray="5,4,2,6" strokeLinecap="round" />
              <line x1="104" y1="40" x2="106" y2="170" stroke="#ff8f00" strokeWidth="1" strokeDasharray="2,6,1,5" />

              {/* Stripe 3 (Right margin) */}
              <line x1="110" y1="50" x2="114" y2="135" stroke="#fbc02d" strokeWidth="2.2" strokeDasharray="6,8" strokeLinecap="round" />
              <line x1="110" y1="50" x2="114" y2="135" stroke="#e65100" strokeWidth="1" strokeDasharray="3,5" />

              {/* Stripe 4 (Left edge) */}
              <line x1="92" y1="100" x2="94" y2="190" stroke="#fbc02d" strokeWidth="2" strokeDasharray="3,5" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 9. WHEAT LEAF RUST (SCATTERED ORANGE FRECKLES)
      case 'wheat_leaf_rust':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="wheatRustBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e6ee9c" />
                <stop offset="60%" stopColor="#9ccc65" />
                <stop offset="100%" stopColor="#33691e" />
              </linearGradient>
            </defs>
            {/* Leaf Blade */}
            <path 
              d="M 90 195 Q 85 100 130 20 Q 105 70 102 195 Z" 
              fill="url(#wheatRustBg)" 
            />

            {/* Random brown/cinnamon-orange round pustules scattered on leaf */}
            <circle cx="106" cy="55" r="3.5" fill="#d84315" stroke="#ffb74d" strokeWidth="1" />
            <circle cx="118" cy="72" r="2.5" fill="#bf360c" stroke="#ffb74d" strokeWidth="0.8" />
            <circle cx="98" cy="85" r="4.2" fill="#d84315" stroke="#ffe082" strokeWidth="1.2" />
            <circle cx="104" cy="98" r="3" fill="#8d6e63" stroke="#ffb74d" strokeWidth="0.8" />
            <circle cx="110" cy="118" r="3.8" fill="#bf360c" stroke="#ffe082" strokeWidth="1" />
            <circle cx="96" cy="130" r="2.5" fill="#d84315" />
            <circle cx="100" cy="148" r="4" fill="#bf360c" stroke="#ffb74d" strokeWidth="1" />
            <circle cx="105" cy="170" r="3" fill="#d84315" />
            
            <circle cx="115" cy="140" r="2" fill="#d84315" />
            <circle cx="95" cy="110" r="2" fill="#8d6e63" />
          </svg>
        );

      // 10. CORN HEALTHY (BROAD RIBBED LEAF)
      case 'corn_healthy':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="cornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4db6ac" />
                <stop offset="60%" stopColor="#00796b" />
                <stop offset="100%" stopColor="#004d40" />
              </linearGradient>
            </defs>
            {/* Broad corn leaf drawing */}
            <path 
              d="M 100 190 Q 75 120 145 25 C 105 85 110 160 100 190 Z" 
              fill="url(#cornGrad)" 
              filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.14))"
            />
            {/* Strong white midrib */}
            <path d="M 100 190 Q 90 120 145 25" stroke="#b2dfdb" strokeWidth="3.5" fill="none" opacity="0.8" />
            {/* Fine parallel veins */}
            <path d="M 98 170 Q 88 120 127 50" stroke="#b2dfdb" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M 102 180 Q 95 130 137 60" stroke="#b2dfdb" strokeWidth="1" fill="none" opacity="0.3" />
          </svg>
        );

      // 11. CORN COMMON RUST (CINNAMON PUSTULES)
      case 'corn_rust':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="cornRustBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#80cbc4" />
                <stop offset="60%" stopColor="#00695c" />
                <stop offset="100%" stopColor="#004d40" />
              </linearGradient>
            </defs>
            {/* Leaf */}
            <path 
              d="M 100 190 Q 75 120 145 25 C 105 85 110 160 100 190 Z" 
              fill="url(#cornRustBg)" 
            />
            {/* Strong midrib */}
            <path d="M 100 190 Q 90 120 145 25" stroke="#b2dfdb" strokeWidth="3.5" fill="none" opacity="0.6" />

            {/* Powdery cinnamon brown rust lesions on upper and lower surfaces */}
            <g opacity="0.95">
              <ellipse cx="108" cy="85" rx="5" ry="3" fill="#d84315" stroke="#ffe082" strokeWidth="0.8" transform="rotate(-30, 108, 85)" />
              <ellipse cx="98" cy="115" rx="6" ry="3.5" fill="#c27d38" stroke="#ffd54f" strokeWidth="1" transform="rotate(-20, 98, 115)" />
              <ellipse cx="112" cy="130" rx="4.5" ry="2.5" fill="#d84315" stroke="#ffe082" strokeWidth="0.8" transform="rotate(-40, 112, 130)" />
              <ellipse cx="102" cy="60" rx="4" ry="2" fill="#a0522d" transform="rotate(-15, 102, 60)" />
              <ellipse cx="122" cy="70" rx="5.5" ry="3" fill="#c27d38" stroke="#ffd54f" strokeWidth="0.8" transform="rotate(-35, 122, 70)" />
              <ellipse cx="95" cy="145" rx="5" ry="3" fill="#d84315" transform="rotate(-10, 95, 145)" />
              <ellipse cx="105" cy="165" rx="4" ry="2" fill="#8d6e63" stroke="#ffe082" strokeWidth="0.5" />
            </g>
          </svg>
        );

      // 12. CORN GRAY LEAF SPOT (RECTANGULAR MATCHBOX PATCHES)
      case 'corn_gray_spot':
        return (
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="cornGrayBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a5d6a7" />
                <stop offset="60%" stopColor="#2e7d32" />
                <stop offset="100%" stopColor="#1b5e20" />
              </linearGradient>
              {/* Blocky grey spot */}
              <linearGradient id="blockySpot" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#90a4ae" />
                <stop offset="50%" stopColor="#78909c" />
                <stop offset="100%" stopColor="#cfd8dc" opacity="0.9" />
              </linearGradient>
            </defs>
            {/* Leaf */}
            <path 
              d="M 100 190 Q 75 120 145 25 C 105 85 110 160 100 190 Z" 
              fill="url(#cornGrayBg)" 
            />
            {/* Midrib */}
            <path d="M 100 190 Q 90 120 145 25" stroke="#c8e6c9" strokeWidth="3.5" fill="none" opacity="0.6" />

            {/* Blocky Rectangular Gray Spots aligned strictly parallel to veins */}
            {/* Lesion 1 */}
            <rect x="108" y="90" width="8" height="24" rx="1.5" fill="url(#blockySpot)" stroke="#ffe082" strokeWidth="0.8" transform="rotate(-30, 108, 90)" />
            {/* Lesion 2 */}
            <rect x="94" y="125" width="6" height="18" rx="1" fill="url(#blockySpot)" stroke="#ffe082" strokeWidth="0.8" transform="rotate(-30, 94, 125)" />
            {/* Lesion 3 */}
            <rect x="120" y="65" width="7" height="20" rx="1.2" fill="url(#blockySpot)" stroke="#e6ee9c" strokeWidth="0.6" transform="rotate(-30, 120, 65)" />
            {/* Lesion 4 (smaller) */}
            <rect x="100" y="75" width="4" height="12" rx="0.5" fill="#78909c" transform="rotate(-30, 100, 75)" />
            {/* Lesion 5 */}
            <rect x="98" y="155" width="7" height="16" rx="1" fill="url(#blockySpot)" transform="rotate(-30, 98, 155)" />
          </svg>
        );

      default:
        // FALLBACK: A LOVELY MINIMAL LEAF SVG
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M 50 10 C 70 30 90 50 80 80 C 70 90 60 95 50 98 C 40 95 30 90 20 80 C 10 50 30 30 50 10 Z" fill="#81c784" />
            <path d="M 50 10 C 50 40 50 70 50 98" stroke="#2e7d32" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <div className={`leaf-illustrator ${className}`} style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px'
    }}>
      {renderLeafSVG()}
    </div>
  );
};
export default LeafIllustrator;
