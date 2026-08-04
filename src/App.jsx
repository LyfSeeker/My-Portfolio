import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Moon, Sun, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiGmail, SiBuymeacoffee } from 'react-icons/si';
import { BootSequence, AsciiSphere, AsciiWave } from './components/TerminalFx';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container" style={{ overflow: booted ? 'auto' : 'hidden', height: booted ? 'auto' : '100vh' }}>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="nav-logo">aj.</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero container" id="home">
          <div className="profile-hero">
            <div className="hero-content">
              <p className="hero-subtitle mono">Hi, I'm</p>
              <h1 className="hero-title"><span style={{ color: 'var(--text-secondary)' }}>Allen</span> P. Jison<span className="status-dot" title="Available for work"></span></h1>
              <p className="hero-description">
                A Full-Stack Developer who ships AI-powered products that real users rely on. 
                I care about high-quality user experience, system design, and building robust backend infrastructure.
                I ship fast under deadlines without dropping quality, and I love building tools that solve real problems.
              </p>
              <div className="btn-group">
                <a href="#contact" className="btn btn-primary">
                  Schedule Call
                </a>
                <a href="#" className="btn btn-secondary">
                  Resume
                </a>
              </div>
              <div className="footer-socials mt-8">
                <a href="https://x.com/allenpj_" target="_blank" rel="noopener noreferrer">X</a>
                <a href="https://linkedin.com/in/allenpjison" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                <a href="https://github.com/LyfSeeker" target="_blank" rel="noopener noreferrer">GITHUB</a>
                <a href="mailto:allenpjison@gmail.com">EMAIL</a>
              </div>
            </div>
          </div>
        </section>

        {/* About / Terminal Section */}
        <section className="section container" id="about">
          <AsciiSphere />
          <div className="section-header">
            <h2 className="section-title">origin_story.sh</h2>
          </div>
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dot dot-red"></div>
              <div className="terminal-dot dot-yellow"></div>
              <div className="terminal-dot dot-green"></div>
              <span className="terminal-title">bash</span>
            </div>
            <div className="terminal-body mono">
              <span className="term-prompt">$</span> <span className="term-cmd">cat about.json</span>
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
              <br/>
              <span className="term-prompt">$</span> <span className="term-cmd">./execute_growth</span>
            </div>
          </div>
        </section>

        {/* Stats / GitHub Contributions */}
        <section className="section container" id="stats">
          <div className="section-header">
            <h2 className="section-title">Contributions</h2>
            <p className="section-subtitle">GitHub profile activity</p>
          </div>
          <div className="github-graph-container">
            <GitHubCalendar 
              username="LyfSeeker" 
              colorScheme={theme}
              theme={{
                light: ['#ebedf0', '#cccccc', '#999999', '#666666', '#333333'],
                dark: ['#2d2d2d', '#5c5c5c', '#8a8a8a', '#b8b8b8', '#e6e6e6'],
              }}
            />
          </div>
        </section>

        {/* Experience Section */}
        <section className="section container" id="experience">
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date mono">Mar 2026 – Present</span>
              <h3 className="timeline-title">ENIAC</h3>
              <p className="timeline-subtitle">Business Development Intern</p>
              <p className="timeline-desc">Collaborating with technical teams, improving workflows, and understanding software products at scale.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date mono">Jan 2025 – May 2025</span>
              <h3 className="timeline-title">Talrop</h3>
              <p className="timeline-subtitle">Student Intern</p>
              <p className="timeline-desc">Worked with modern software development workflows, agile methodologies, and industry-standard development practices.</p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="section container" id="projects">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="grid-2">
            <div className="project-card">
              <h3 className="project-title">Lucidus'26</h3>
              <p className="project-desc">Official website for the college fest. High traffic support, mobile-first, and performance optimized.</p>
              <div className="project-tags">
                <span className="tag">Responsive</span>
                <span className="tag">Performance</span>
              </div>
              <div className="project-links">
                <a href="#">View Live <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="project-card">
              <h3 className="project-title">CineLenz</h3>
              <p className="project-desc">AI-powered movie sentiment analysis platform featuring trend visualization and dataset processing.</p>
              <div className="project-tags">
                <span className="tag">AI</span>
                <span className="tag">Sentiment Analysis</span>
              </div>
              <div className="project-links">
                <a href="#">View Live <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="project-card">
              <h3 className="project-title">Zynqtra</h3>
              <p className="project-desc">Gamified networking platform with QR networking, wallet authentication, and leaderboards.</p>
              <div className="project-tags">
                <span className="tag">Web3</span>
                <span className="tag">Networking</span>
              </div>
              <div className="project-links">
                <a href="#">View Live <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="project-card">
              <h3 className="project-title">Web3Ads</h3>
              <p className="project-desc">Decentralized advertising platform focusing on modern UI and responsive frontend.</p>
              <div className="project-tags">
                <span className="tag">Blockchain</span>
                <span className="tag">DApp</span>
              </div>
              <div className="project-links">
                <a href="#">View Live <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Hackathons Section */}
        <section className="section container" id="hackathons">
          <div className="section-header">
            <h2 className="section-title">Hackathons</h2>
          </div>
          <div className="hackathon-list">
            <div className="hackathon-item">
              <span className="hackathon-title">ETHMumbai 2026</span>
              <span className="hackathon-award">🥈 2nd Prize</span>
            </div>
            <div className="hackathon-item">
              <span className="hackathon-title">Relay Coding Competition</span>
              <span className="hackathon-award">🥈 2nd Prize</span>
            </div>
            <div className="hackathon-item">
              <span className="hackathon-title">BNB Hack Kerala</span>
              <span className="hackathon-award">Tier 4 Recognition</span>
            </div>
            <div className="hackathon-item">
              <span className="hackathon-title">Arbitrum Open House</span>
              <span>Participant</span>
            </div>
            <div className="hackathon-item">
              <span className="hackathon-title">CineHack (National AI Hackathon)</span>
              <span>Participant</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section container" id="skills">
          <div className="section-header">
            <h2 className="section-title">Tech Stack</h2>
          </div>
          
          <div className="skill-category">
            <h3 className="mono">{'//'} Languages</h3>
            <div className="skill-list">
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">Solidity</span>
              <span className="skill-tag">C</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h3 className="mono">{'//'} Frontend & Backend</h3>
            <div className="skill-list">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express.js</span>
              <span className="skill-tag">SQL</span>
              <span className="skill-tag">MongoDB</span>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="mono">{'//'} Blockchain & AI</h3>
            <div className="skill-list">
              <span className="skill-tag">Smart Contracts</span>
              <span className="skill-tag">Hardhat & Foundry</span>
              <span className="skill-tag">Wagmi</span>
              <span className="skill-tag">LLM Integrations</span>
              <span className="skill-tag">Prompt Engineering</span>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="mono">{'//'} Tools</h3>
            <div className="skill-list">
              <span className="skill-tag">Git & GitHub</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">Vercel & Render</span>
            </div>
          </div>
        </section>

        <section className="container">
          <AsciiWave />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer container" id="contact">
        <div className="footer-content">
          <div>
            <p className="footer-text">© 2026 Allen P. Jison. All rights reserved.</p>
            <p className="footer-text mt-2 mono" style={{fontSize: '0.75rem'}}>Designed with precision.</p>
          </div>
          <div className="footer-socials" style={{ fontSize: '1.5rem', gap: '1.5rem' }}>
            <a href="https://x.com/allenpj_" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://github.com/LyfSeeker" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com/in/allenpjison" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="mailto:allenpjison@gmail.com"><SiGmail /></a>
            <a href="https://buymeacoffee.com/allenpj" target="_blank" rel="noopener noreferrer"><SiBuymeacoffee /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
