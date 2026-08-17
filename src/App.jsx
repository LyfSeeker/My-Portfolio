import { useState, useEffect } from 'react';
import { PopupButton } from 'react-calendly';
import { GitHubCalendar } from 'react-github-calendar';
import { Moon, Sun, ArrowUpRight, ArrowRight, Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiGmail, SiBuymeacoffee } from 'react-icons/si';
import { TypewriterText } from './components/TerminalFx';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Preloader } from './components/Preloader';
import { SkillsMarquee } from './components/SkillsMarquee';
import { ImageCarousel } from './components/ImageCarousel';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [booted, setBooted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container" style={{ overflow: booted ? 'auto' : 'hidden', height: booted ? 'auto' : '100vh' }}>
      {!booted && <Preloader onComplete={() => setBooted(true)} />}
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="nav-logo">aj.</div>
          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero container" id="home">
          <div className="profile-hero">
            <div className="hero-content">
              <p className="hero-subtitle mono">Hi, I'm</p>
              <h1 className="hero-title" style={{ position: 'relative' }}>
                Allen P Jison
              </h1>
              <TypewriterText strings={['Full Stack Developer', 'Frontend Developer', 'Blockchain Developer', 'Backend Engineer']} delay={4000} />
              <p className="hero-description">
                I'm a full-stack developer passionate about building fast, scalable web applications and AI-powered products. I enjoy solving real-world problems, participating in hackathons, and turning ideas into polished user experiences.
              </p>
              <div className="btn-group">
                <PopupButton
                  url="https://calendly.com/allenpjison"
                  rootElement={document.getElementById('root')}
                  text="Schedule Call"
                  className="btn btn-primary"
                />
                <a href="/resume.pdf" download="Allen_P_Jison_Resume.pdf" className="btn btn-secondary">
                  Resume
                </a>
              </div>
              <div className="footer-socials mt-8" style={{ fontSize: '1.4rem', gap: '1.25rem' }}>
                <a href="https://x.com/allenpj_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>
                <a href="https://linkedin.com/in/allenpjison" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://github.com/LyfSeeker" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href="mailto:allenpjison@gmail.com" aria-label="Email"><SiGmail /></a>
                <a href="https://instagram.com/allen_p.j" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://t.me/allen_xz" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegram /></a>
              </div>
            </div>
          </div>
        </section>

        {/* About / Terminal Section */}
        <section className="section container" id="about">
          <div className="section-header">
            <h2 className="section-title">origin_story.sh</h2>
            <p className="section-subtitle">Type 'help' to see available commands</p>
          </div>
          <InteractiveTerminal />
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
              <span className="timeline-date mono">Mar 2026 – Jun 2026</span>
              <h3 className="timeline-title">ENIAC</h3>
              <p className="timeline-subtitle">Business Development Intern</p>
              <ul className="timeline-desc" style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Spearheaded strategic outreach initiatives and managed direct client communications to optimize engagement and drive ecosystem growth.</li>
                <li>Streamlined operational workflows and onboarding processes, improving cross-functional efficiency within a fast-paced Web3 environment.</li>
              </ul>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date mono">Jan 2025 – May 2025</span>
              <h3 className="timeline-title">Talrop</h3>
              <p className="timeline-subtitle">Student Intern</p>
              <ul className="timeline-desc" style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Acquired hands-on experience with industrial software development lifecycles, agile workflows, and enterprise-grade technology standards.</li>
              </ul>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="timeline-date mono">Dec 2024 – Mar 2025</span>
              <h3 className="timeline-title">5ireChain</h3>
              <p className="timeline-subtitle">Growth Intern</p>
              <ul className="timeline-desc" style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Drove ecosystem expansion and community engagement initiatives for the 5ireChain blockchain network.</li>
                <li>Analyzed Web3 market trends to identify and execute strategic growth opportunities, significantly enhancing developer relations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="section container" id="projects">
          <div className="section-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Things I've built</h2>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <img src="/equidoxai.png" alt="Equidox AI preview" style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#0f1115', borderRadius: '4px', marginBottom: '1.5rem', border: '1px solid var(--border)' }} />
              <h3 className="project-title">Equidox AI</h3>
              <p className="project-desc">A blockchain-powered AI platform built on the Stellar network.</p>
              <div className="project-tags">
                <span className="tag">Stellar</span>
                <span className="tag">Blockchain</span>
                <span className="tag">AI</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/LyfSeeker/Equidox-AI" target="_blank" rel="noopener noreferrer" aria-label="View Equidox AI GitHub"><span className="term-prompt">$</span> view_code -&gt;</a>
                <a href="https://equidox.site" target="_blank" rel="noopener noreferrer" aria-label="View Equidox AI Live"><span className="term-prompt">$</span> preview -&gt;</a>
              </div>
            </div>
            <div className="project-card">
              <video src="/cinelenz.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}></video>
              <h3 className="project-title">CineLenz</h3>
              <p className="project-desc">AI-powered movie sentiment analysis platform featuring trend visualization and dataset processing.</p>
              <div className="project-tags">
                <span className="tag">AI</span>
                <span className="tag">Sentiment Analysis</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/LyfSeeker/cinelenzV2" target="_blank" rel="noopener noreferrer" aria-label="View CineLenz GitHub"><span className="term-prompt">$</span> view_code -&gt;</a>
                <a href="https://cinelenz.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="View CineLenz Live"><span className="term-prompt">$</span> preview -&gt;</a>
              </div>
            </div>
            <div className="project-card">
              <ImageCarousel images={['/zynqtra-1.png', '/zynqtra-2.png', '/zynqtra-3.png', '/zynqtra-4.png']} />
              <h3 className="project-title">Zynqtra</h3>
              <p className="project-desc">Gamified networking platform with QR networking, wallet authentication, and leaderboards.</p>
              <div className="project-tags">
                <span className="tag">Web3</span>
                <span className="tag">Networking</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/LyfSeeker/zynqtra" target="_blank" rel="noopener noreferrer" aria-label="View Zynqtra GitHub"><span className="term-prompt">$</span> view_code -&gt;</a>
                <a href="https://zynqtra-gamma.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="View Zynqtra Live"><span className="term-prompt">$</span> preview -&gt;</a>
              </div>
            </div>
            <div className="project-card">
              <ImageCarousel images={['/web3ads.png', '/web3ads-2.png', '/web3ads-3.png', '/web3ads-4.png']} />
              <h3 className="project-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Web3Ads
                <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  🥈 ETHMumbai '26
                </span>
              </h3>
              <p className="project-desc">Decentralized advertising platform focusing on modern UI and responsive frontend.</p>
              <div className="project-tags">
                <span className="tag">Blockchain</span>
                <span className="tag">DApp</span>
              </div>
              <div className="project-links">
                <a href="https://web3ads.wtf" target="_blank" rel="noopener noreferrer" aria-label="View Web3Ads Live"><span className="term-prompt">$</span> preview -&gt;</a>
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

        <SkillsMarquee />

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
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer container" id="contact">
        <div style={{
          textAlign: 'center',
          padding: '2rem 1rem 3rem 1rem',
          maxWidth: '800px',
          margin: '0 auto',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          fontFamily: '"Space Mono", monospace',
          fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
          letterSpacing: '0.05em',
          lineHeight: '1.6'
        }}>
          "Ever tried. Ever failed. No matter. Try again. Fail again. Fail better."
        </div>
        <div className="footer-content">
          <div>
            <p className="footer-text">© 2026 Allen P. Jison. All rights reserved.</p>
            <p className="footer-text mt-2 mono" style={{ fontSize: '0.75rem' }}>Designed with precision.</p>
          </div>
          <div className="footer-socials" style={{ fontSize: '1.5rem', gap: '1.5rem' }}>
            <a href="https://x.com/allenpj_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>
            <a href="https://github.com/LyfSeeker" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com/in/allenpjison" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="mailto:allenpjison@gmail.com" aria-label="Email"><SiGmail /></a>
            <a href="https://buymeacoffee.com/allenpj" target="_blank" rel="noopener noreferrer" aria-label="Buy Me a Coffee"><SiBuymeacoffee /></a>
            <a href="https://instagram.com/allen_p.j" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://t.me/allen_xz" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegram /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
