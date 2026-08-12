import React from 'react';

export const NotFound = () => {
  return (
    <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
      <div className="terminal-card" style={{ maxWidth: '500px', width: '90%' }}>
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span className="terminal-title">404.error</span>
        </div>
        <div className="terminal-body mono" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <h1 style={{ fontSize: '4rem', color: '#ff5f56', marginBottom: '1rem' }}>404</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Looks like this page doesn't exist.
          </p>
          <a href="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>
            ← Back Home
          </a>
        </div>
      </div>
    </div>
  );
};
