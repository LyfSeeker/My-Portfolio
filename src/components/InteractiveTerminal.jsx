import React, { useState, useRef, useEffect } from 'react';

export const InteractiveTerminal = () => {
  const initialAboutOutput = (
    <div>
      <div>{`{`}</div>
      <div style={{ paddingLeft: '1rem' }}>
        <span className="term-key">"degree"</span>: <span className="term-string">"B.Tech Computer Science @ Christ College of Engineering"</span>,
        <br/>
        <span className="term-key">"focus"</span>: <span className="term-string">"Full-Stack Development, AI, Blockchain"</span>,
        <br/>
        <span className="term-key">"passion"</span>: <span className="term-string">"Building scalable web applications and decentralized apps"</span>,
        <br/>
        <span className="term-key">"fun_fact"</span>: <span className="term-string">"Built multiple hackathon projects from idea to demo within 24-48 hours"</span>
      </div>
      <div>{`}`}</div>
    </div>
  );

  const [history, setHistory] = useState([
    { type: 'command', text: 'cat about.json' },
    { type: 'output', content: initialAboutOutput }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState(['cat about.json']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const processCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return null; // Return null so we don't append an output
    }
    
    if (trimmedCmd === '') {
      return <div></div>;
    }

    switch (trimmedCmd) {
      case 'help':
        return (
          <div style={{ color: '#d4d4d4' }}>
            Available commands:
            <br />
            <span className="term-cmd">about</span>      - Display background info
            <br />
            <span className="term-cmd">skills</span>     - List tech stack
            <br />
            <span className="term-cmd">projects</span>   - Show featured projects
            <br />
            <span className="term-cmd">experience</span> - View work history
            <br />
            <span className="term-cmd">contact</span>    - Get contact information
            <br />
            <span className="term-cmd">clear</span>      - Clear terminal output
          </div>
        );
      case 'about':
        return initialAboutOutput;
      case 'skills':
        return (
          <div>
            <span className="term-key">Languages:</span> JavaScript, Python, Java, Solidity, C<br />
            <span className="term-key">Frontend:</span> React, Next.js, Tailwind CSS<br />
            <span className="term-key">Backend:</span> Node.js, Express.js, SQL, MongoDB<br />
            <span className="term-key">Blockchain/AI:</span> Smart Contracts, Hardhat, Wagmi, LLMs
          </div>
        );
      case 'projects':
        return (
          <div>
            - <span className="term-key">Lucidus'26</span>: Official college fest website.<br />
            - <span className="term-key">CineLenz</span>: AI-powered movie sentiment analysis.<br />
            - <span className="term-key">Zynqtra</span>: Gamified Web3 networking platform.<br />
            - <span className="term-key">Web3Ads</span>: Decentralized advertising platform.
          </div>
        );
      case 'experience':
        return (
          <div>
            <span className="term-key">ENIAC (Mar 2026 - Present)</span> - Business Development Intern<br />
            <span className="term-key">Talrop (Jan 2025 - May 2025)</span> - Student Intern
          </div>
        );
      case 'contact':
        return (
          <div>
            <span className="term-key">Email:</span> allenpjison@gmail.com<br />
            <span className="term-key">LinkedIn:</span> linkedin.com/in/allenpjison<br />
            <span className="term-key">X (Twitter):</span> x.com/allenpj_<br />
            <span className="term-key">Instagram:</span> instagram.com/allen_p.j<br />
            <span className="term-key">Telegram:</span> t.me/allen_xz<br />
            <span className="term-key">GitHub:</span> github.com/LyfSeeker
          </div>
        );
      default:
        return (
          <div style={{ color: '#ff5f56' }}>
            bash: {trimmedCmd}: command not found. Type 'help' to see available commands.
          </div>
        );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      
      // Update command history
      if (cmd) {
        setCommandHistory(prev => [...prev, cmd]);
      }
      setHistoryIndex(-1); // Reset history index

      // Add command to terminal history
      const newHistory = [...history, { type: 'command', text: cmd }];
      
      const output = processCommand(cmd);
      if (output !== null) {
        newHistory.push({ type: 'output', content: output });
      }
      
      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="terminal-card" onClick={handleFocus} style={{ cursor: 'text' }}>
      <div className="terminal-header">
        <div className="terminal-dot dot-red"></div>
        <div className="terminal-dot dot-yellow"></div>
        <div className="terminal-dot dot-green"></div>
        <span className="terminal-title">bash</span>
      </div>
      <div className="terminal-body mono" ref={terminalBodyRef} style={{ height: '320px', overflowY: 'auto' }}>
        {history.map((entry, i) => (
          <div key={i} style={{ marginBottom: entry.type === 'output' ? '1rem' : '0' }}>
            {entry.type === 'command' ? (
              <div>
                <span className="term-prompt">$</span>{' '}
                <span className="term-cmd" style={{ marginBottom: 0 }}>{entry.text}</span>
              </div>
            ) : (
              <div>{entry.content}</div>
            )}
          </div>
        ))}
        
        {/* Active Input Line */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="term-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input mono"
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
