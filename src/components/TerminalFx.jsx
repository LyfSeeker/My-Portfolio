import React, { useState, useEffect, useRef } from 'react';

// BOOT SEQUENCE COMPONENT
export const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [completed, setCompleted] = useState(false);

  const bootLines = [
    "BIOS Date 08/03/26 02:12:02 Ver 08.00.15",
    "CPU: Neural Processor Unit @ 4.20GHz",
    "Memory Testing: 65536K OK",
    "Loading OS: AllenOS...",
    "Mounting file systems... [OK]",
    "Initializing neural networks... [OK]",
    "Starting interface...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootLines[currentLine]]);
      currentLine++;
      
      if (currentLine >= bootLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setCompleted(true);
          setTimeout(onComplete, 500); // fade out time
        }, 1000);
      }
    }, 400); // delay between lines

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#0a0a0a',
      color: '#e0e0e0',
      fontFamily: '"Space Mono", monospace',
      zIndex: 9999,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      opacity: completed ? 0 : 1,
      transition: 'opacity 0.5s ease-out',
      pointerEvents: completed ? 'none' : 'all'
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{ marginBottom: '0.5rem' }}>{line}</div>
      ))}
      {!completed && (
        <div style={{ 
          width: '10px', height: '1.2em', 
          backgroundColor: '#e0e0e0', 
          animation: 'blink 1s step-end infinite',
          marginTop: '0.5rem'
        }} />
      )}
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

// ASCII SPHERE COMPONENT
export const AsciiSphere = () => {
  const [frame, setFrame] = useState('');
  const A = useRef(0);
  const B = useRef(0);

  useEffect(() => {
    const chars = '.,-~:;=!*#$@';
    
    const renderFrame = () => {
      let b = [];
      let z = [];
      A.current += 0.05;
      B.current += 0.05;
      
      const width = 40;
      const height = 20;
      
      for (let k = 0; k < width * height; k++) {
        b[k] = k % width === width - 1 ? '\\n' : ' ';
        z[k] = 0;
      }
      
      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          let c = Math.sin(i);
          let d = Math.cos(j);
          let e = Math.sin(A.current);
          let f = Math.sin(j);
          let g = Math.cos(A.current);
          let h = d + 2;
          let D = 1 / (c * h * e + f * g + 5);
          let l = Math.cos(i);
          let m = Math.cos(B.current);
          let n = Math.sin(B.current);
          let t = c * h * g - f * e;
          
          let x = Math.floor(width / 2 + 15 * D * (l * h * m - t * n));
          let y = Math.floor(height / 2 + 8 * D * (l * h * n + t * m));
          let o = x + width * y;
          let N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));
          
          if (height > y && y > 0 && x > 0 && width > x && D > z[o]) {
            z[o] = D;
            b[o] = chars[N > 0 ? N : 0];
          }
        }
      }
      setFrame(b.join(''));
    };

    const interval = setInterval(renderFrame, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-card" style={{ marginBottom: '2rem' }}>
      <div className="terminal-header">
        <div className="terminal-dot dot-red"></div>
        <div className="terminal-dot dot-yellow"></div>
        <div className="terminal-dot dot-green"></div>
        <span className="terminal-title">eye.proc</span>
      </div>
      <div style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        justifyContent: 'center', 
        background: '#0a0a0a',
        overflow: 'hidden'
      }}>
        <pre style={{ 
          fontFamily: '"Space Mono", monospace', 
          fontSize: '0.65rem',
          lineHeight: '0.65rem',
          color: 'var(--text-primary)',
          margin: 0
        }}>
          {frame}
        </pre>
      </div>
    </div>
  );
};

// ASCII WAVE COMPONENT
export const AsciiWave = () => {
  const [frame, setFrame] = useState('');
  const time = useRef(0);

  useEffect(() => {
    const chars = ' .:;+=xX$&';
    const width = 50;
    const height = 15;

    const renderFrame = () => {
      let b = [];
      time.current += 0.1;
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const noise = Math.sin(x * 0.2 + time.current) + Math.cos(y * 0.3 + time.current * 0.8);
          const normalized = (noise + 2) / 4; // 0 to 1
          const charIdx = Math.floor(normalized * chars.length);
          b.push(chars[Math.min(charIdx, chars.length - 1)]);
        }
        b.push('\\n');
      }
      setFrame(b.join(''));
    };

    const interval = setInterval(renderFrame, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-card" style={{ marginBottom: '2rem' }}>
      <div className="terminal-header">
        <div className="terminal-dot dot-red"></div>
        <div className="terminal-dot dot-yellow"></div>
        <div className="terminal-dot dot-green"></div>
        <span className="terminal-title">warp.fx</span>
      </div>
      <div style={{ 
        padding: '1.5rem', 
        background: '#0a0a0a',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <pre style={{ 
          fontFamily: '"Space Mono", monospace', 
          fontSize: '0.65rem',
          lineHeight: '0.65rem',
          color: 'var(--text-secondary)',
          margin: 0
        }}>
          {frame}
        </pre>
      </div>
    </div>
  );
};
