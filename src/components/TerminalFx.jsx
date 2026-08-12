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
        b[k] = k % width === width - 1 ? '\n' : ' ';
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
        b.push('\n');
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

// SYSTEM INFO / INTERACTIVE TERMINAL COMPONENT
export const SystemInfo = () => {
  const [uptime, setUptime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Start uptime at ~7882 days for the retro feel from the reference
    setUptime(7882 * 24 * 3600 + 2 * 3600 + 23 * 60 + 40);
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const formatUptime = (seconds) => {
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  // Generate some static stars/points for the constellation
  const points = [
    { x: 20, y: 30 }, { x: 40, y: 20 }, { x: 30, y: 50 },
    { x: 60, y: 40 }, { x: 70, y: 70 }, { x: 25, y: 80 },
    { x: 80, y: 30 }, { x: 50, y: 85 }, { x: 85, y: 65 }
  ];

  return (
    <div className="terminal-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="terminal-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="terminal-title" style={{ margin: 0 }}>[skills.frameworks]</span>
        </div>
        <span style={{color: '#fff', fontSize: '0.75rem'}}>live</span>
      </div>
      
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="system-info-body"
        style={{ 
          padding: '1.5rem', 
          background: '#0a0a0a',
          color: '#d4d4d4',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.85rem',
          display: 'flex',
          flexWrap: 'wrap-reverse',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
          flex: 1,
          alignItems: 'center'
        }}
      >
        {/* Interactive Constellation Area */}
        <div style={{
          flex: '1 1 200px',
          position: 'relative',
          height: '200px',
          minWidth: '200px',
          cursor: 'crosshair'
        }}>
          {/* Points that shift slightly away from mouse */}
          {points.map((p, i) => {
            const dx = p.x - mousePos.x;
            const dy = p.y - mousePos.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const moveX = dist < 30 ? (dx/dist) * 5 : 0;
            const moveY = dist < 30 ? (dy/dist) * 5 : 0;
            
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `translate(${moveX}px, ${moveY}px)`,
                color: '#888',
                fontSize: '0.7rem',
                transition: 'transform 0.2s ease-out'
              }}>
                x
              </div>
            );
          })}

          {/* Mouse tracking crosshair */}
          <div style={{
            position: 'absolute',
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            whiteSpace: 'pre',
            textAlign: 'center',
            lineHeight: '1',
            pointerEvents: 'none',
            transition: 'left 0.1s ease-out, top 0.1s ease-out'
          }}>
{`   |   
 --+-- 
   |   `}
          </div>
        </div>
        
        {/* System Text */}
        <div style={{ 
          flex: '1 1 250px', 
          zIndex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem',
          lineHeight: '1.4'
        }}>
          <div><span style={{color: '#9ca3af'}}>OS:</span> HumanOS</div>
          <div><span style={{color: '#9ca3af'}}>Kernel:</span> Claude Code</div>
          <div><span style={{color: '#9ca3af'}}>Uptime:</span> {formatUptime(uptime)}<br/><span style={{color: '#6b7280', fontSize: '0.75rem'}}>440ms</span></div>
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{color: '#9ca3af'}}>Packages:</span> React, Node,<br/>Solidity, SQL
          </div>
          <div>
            <span style={{color: '#9ca3af'}}>Frameworks:</span> Next.js, Express,<br/>Hardhat, Wagmi
          </div>
        </div>
      </div>
    </div>
  );
};

// TYPEWRITER TEXT COMPONENT
export const TypewriterText = ({ strings, delay = 2000 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    
    const currentFullString = strings[currentStringIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
        // Small pause before typing next word
        timeout = setTimeout(() => {}, 200); 
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentFullString.substring(0, currentText.length - 1));
        }, 50); // Delete speed
      }
    } else {
      if (currentText === currentFullString) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delay); // Wait before deleting
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentFullString.substring(0, currentText.length + 1));
        }, 100); // Type speed
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentStringIndex, strings, delay]);

  return (
    <div style={{
      fontSize: '1.25rem',
      fontFamily: '"Space Mono", monospace',
      marginBottom: '1.5rem',
      color: 'var(--text-secondary)',
      display: 'inline-block',
      position: 'relative',
      minHeight: '1.5em'
    }}>
      <span>{currentText}</span>
      <span style={{ 
        display: 'inline-block',
        width: '0.6em',
        height: '1.1em',
        backgroundColor: 'var(--text-secondary)',
        animation: 'blink 1s step-end infinite',
        verticalAlign: 'middle',
        marginLeft: '4px',
        opacity: 0.8
      }}></span>
      <style>{`
        @keyframes blink { 
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
