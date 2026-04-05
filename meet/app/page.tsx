'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const startMeeting = () => {
    router.push(`/rooms/room-${Math.random().toString(36).substring(2, 10)}`);
  };

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      router.push(`/rooms/${roomId.trim()}`);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --background: #081425;
          --surface: #081425;
          --surface-container: #152031;
          --surface-container-low: #111c2d;
          --surface-container-high: #1f2a3c;
          --surface-variant: #2a3548;
          --surface-dim: #081425;
          --surface-bright: #2f3a4c;
          --on-surface: #d8e3fb;
          --on-surface-variant: #c2c6d4;
          --on-background: #d8e3fb;
          --primary: #a3c9ff;
          --primary-container: #0061ae;
          --primary-fixed: #d3e3ff;
          --primary-fixed-dim: #a3c9ff;
          --on-primary: #00315c;
          --on-primary-fixed: #001c39;
          --on-primary-fixed-variant: #004883;
          --on-primary-container: #c7dcff;
          --secondary: #c7fff0;
          --secondary-container: #00f2d1;
          --secondary-fixed: #26fedc;
          --secondary-fixed-dim: #00dfc1;
          --on-secondary: #00382f;
          --on-secondary-fixed: #00201a;
          --on-secondary-container: #006a5a;
          --on-secondary-fixed-variant: #005144;
          --tertiary: #d0bcff;
          --tertiary-container: #6f3dd9;
          --tertiary-fixed: #e9ddff;
          --tertiary-fixed-dim: #d0bcff;
          --on-tertiary: #3c0091;
          --on-tertiary-container: #e3d5ff;
          --on-tertiary-fixed: #23005c;
          --on-tertiary-fixed-variant: #5516be;
          --error: #ffb4ab;
          --error-container: #93000a;
          --on-error: #690005;
          --on-error-container: #ffdad6;
          --outline: #8c919d;
          --outline-variant: #424752;
          --surface-tint: #a3c9ff;
          --inverse-primary: #0060ab;
          --inverse-surface: #d8e3fb;
          --inverse-on-surface: #263143;
          --surface-container-lowest: #040e1f;
          --surface-container-highest: #2a3548;
          --glass-bg: rgba(42, 53, 72, 0.6);
        }

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }

        .footer-link {
          color: rgba(216, 227, 251, 0.4);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-link:hover {
          color: #00f2d1;
        }

        .social-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #152031;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(216, 227, 251, 0.4);
          text-decoration: none;
          transition: color 0.3s;
        }

.social-icon:hover {
          color: #00f2d1;
        }

        .glass-btn {
          background: linear-gradient(to bottom right, var(--primary), var(--primary-container));
          color: #001c39;
          font-weight: 700;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex: 1;
          transition: transform 0.1s;
        }

        .glass-btn:hover {
          transform: scale(0.98);
        }

        .secondary-btn {
          background: rgba(42, 53, 72, 0.4);
          color: #d8e3fb;
          font-weight: 700;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex: 1;
          transition: transform 0.1s, opacity 0.3s;
        }

        .secondary-btn:hover {
          background: rgba(42, 53, 72, 0.8);
          transform: scale(0.98);
        }

        body {
          background: var(--background);
          color: var(--on-surface);
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .room-controls {
            flex-direction: row !important;
          }
          .room-controls > div:first-child {
            flex: 1;
          }
        }

        @media (max-width: 767px) {
          .room-controls {
            flex-direction: column !important;
          }
        }
      `}</style>

      <nav style={{
        background: '#081425',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        borderBottom: '1px solid rgba(66, 71, 82, 0.15)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '1rem 2rem',
          maxWidth: '1280px',
          margin: '0 auto',
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.875rem',
          fontWeight: 500,
          letterSpacing: '-0.02em'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            color: '#d8e3fb',
            cursor: 'pointer'
          }}>
            NextGen Meets
          </div>
          <div style={{ minHeight: '2rem' }}></div>
        </div>
      </nav>

      <main style={{ paddingTop: '6rem' }}>
        <section style={{
          minHeight: '870px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% -20%, #152031 0%, #081425 70%)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%',
            opacity: 0.2,
            pointerEvents: 'none'
          }}>
            <div style={{
              position: 'absolute',
              top: '25%',
              left: '25%',
              width: '24rem',
              height: '24rem',
              background: 'rgba(163, 201, 255, 0.2)',
              filter: 'blur(120px)',
              borderRadius: '50%'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '25%',
              right: '25%',
              width: '24rem',
              height: '24rem',
              background: 'rgba(199, 255, 240, 0.2)',
              filter: 'blur(120px)',
              borderRadius: '50%'
            }}></div>
          </div>

          <div style={{
            maxWidth: '56rem',
            margin: '0 auto',
            zIndex: 10
          }}>
            <h1 style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              color: '#d8e3fb',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              Cinematic collaboration <br/>
              <span style={{
                background: 'linear-gradient(to right, var(--primary), var(--secondary-container))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>powered by AI.</span>
            </h1>
            <p style={{
              color: '#c2c6d4',
              fontSize: '1.125rem',
              maxWidth: '42rem',
              margin: '0 auto 3rem',
              lineHeight: 1.6
            }}>
              Experience meetings with studio-grade quality and intelligent AI agents that handle the busy work so you can stay in the flow.
            </p>

            <div style={{
              background: 'rgba(42, 53, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '0.5rem',
              borderRadius: '1rem',
              maxWidth: '42rem',
              margin: '0 auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(66, 71, 82, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }} className="room-controls">
                <div style={{ position: 'relative', flex: 1 }}>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#8c919d',
                    fontSize: '1.25rem'
                  }}>meeting_room</span>
                  <input
                    type="text"
                    placeholder="Enter Room Name"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#111c2d',
                      border: 'none',
                      borderRadius: '0.75rem',
                      padding: '1rem 1rem 1rem 3rem',
                      color: '#d8e3fb',
                      fontSize: '1rem',
                      fontWeight: 500,
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={startMeeting}
                    className="glass-btn"
                  >
                    Create Meeting
                  </button>
                  <button
                    onClick={joinMeeting}
                    disabled={!roomId.trim()}
                    className="secondary-btn"
                    style={{
                      opacity: roomId.trim() ? 1 : 0.5,
                      cursor: roomId.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '4rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              opacity: 0.4,
              filter: 'grayscale(1) contrast(1.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined">security</span>
                <span style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>SECURE PIPELINE</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined">auto_awesome</span>
                <span style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>AI ENHANCED</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined">hd</span>
                <span style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>4K STREAMING</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        background: '#081425',
        borderTop: '1px solid rgba(66, 71, 82, 0.15)',
        marginTop: '5rem'
      }}>
        <div style={{
          width: '100%',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#d8e3fb'
            }}>NextGen Meets</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(216, 227, 251, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              © 2024 NextGen Meets. Cinematic Collaboration.
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem'
          }}>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">AI Ethics</a>
            <a href="#" className="footer-link">Security</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="social-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>language</span>
            </a>
            <a href="#" className="social-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>share</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}