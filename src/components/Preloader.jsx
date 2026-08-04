import React, { useState, useEffect } from 'react';

export const Preloader = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: loading, 1: fading out, 2: complete
  const [lettersRevealed, setLettersRevealed] = useState(0);

  const name = "ALLEN";

  useEffect(() => {
    // Check if animation has already played in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    // Timing
    const totalDuration = 2800;
    const letterRevealDelay = (totalDuration - 500) / name.length;

    let currentLetter = 0;
    const interval = setInterval(() => {
      currentLetter++;
      setLettersRevealed(currentLetter);
      if (currentLetter >= name.length) {
        clearInterval(interval);
      }
    }, letterRevealDelay);

    const finishTimeout = setTimeout(() => {
      setStage(1); // Start fade out
      sessionStorage.setItem('hasSeenIntro', 'true');
      
      setTimeout(() => {
        onComplete();
      }, 800); // Wait for fade out to complete
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  // If already seen in this session, return null immediately to avoid flash
  if (sessionStorage.getItem('hasSeenIntro')) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#0a0a0a',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: stage === 1 ? 0 : 1,
      transition: 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
      pointerEvents: stage > 0 ? 'none' : 'all',
      // Subtle dark grid pattern
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      backgroundPosition: 'center center'
    }}>
      {/* Two small circles above */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', alignItems: 'center' }}>
        <div style={{ width: '6px', height: '6px', backgroundColor: '#fff', borderRadius: '50%' }}></div>
        <div style={{ 
          width: '14px', height: '14px', 
          border: '1px solid rgba(255, 255, 255, 0.4)', 
          borderRadius: '50%',
          animation: 'pulse-circle 2s infinite cubic-bezier(0.4, 0, 0.2, 1)'
        }}></div>
      </div>

      {/* Name */}
      <div style={{ 
        display: 'flex', 
        fontSize: 'clamp(3rem, 12vw, 6.5rem)', 
        fontWeight: '800', 
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        letterSpacing: '0.15em',
        userSelect: 'none'
      }}>
        {name.split('').map((char, i) => (
          <span key={i} style={{
            color: '#fff',
            opacity: (i === 0 || i <= lettersRevealed) ? 1 : 0.15,
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            textShadow: (i === 0 || i <= lettersRevealed) ? '0 0 30px rgba(255,255,255,0.4)' : 'none'
          }}>
            {char}
          </span>
        ))}
      </div>

      {/* Loading line below */}
      <div style={{ 
        width: 'min(240px, 80vw)', 
        height: '1px', 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        marginTop: '30px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '100%',
          backgroundColor: '#fff',
          animation: 'fill-line 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards'
        }}></div>
      </div>

      {/* Initializing text */}
      <div style={{
        marginTop: '16px',
        fontSize: '0.65rem',
        letterSpacing: '0.5em',
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily: '"Space Mono", monospace',
        textTransform: 'uppercase'
      }}>
        Initializing
      </div>

      <style>{`
        @keyframes pulse-circle {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.3; }
        }
        @keyframes fill-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};
