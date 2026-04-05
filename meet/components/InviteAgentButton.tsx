'use client';
import { useRoomContext } from '@livekit/components-react';
import { useState } from 'react';

export default function InviteAgentButton() {
  const room = useRoomContext();
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const inviteAgent = async () => {
    setLoading(true);
    try {
      await fetch(process.env.NEXT_PUBLIC_AGENT_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: room.name }),
      });
      setJoined(true);
    } catch (err) {
      console.error('Failed to invite agent', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .invite-agent-btn {
          position: absolute;
          z-index: 90;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease-in-out;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          font-family: inherit;
          
          /* Mobile by default: top right */
          top: 16px;
          right: 16px;
          bottom: auto;
          left: auto;
        }
        
        .invite-agent-btn.state-default {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
        }
        
        .invite-agent-btn.state-default:hover {
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .invite-agent-btn.state-disabled {
          background-color: rgba(50, 50, 50, 0.8);
          color: #aaa;
          cursor: not-allowed;
          border-color: rgba(100, 100, 100, 0.5);
        }

        /* Desktop: bottom right */
        @media (min-width: 768px) {
          .invite-agent-btn {
            top: auto;
            bottom: 24px;
            right: 24px;
          }
        }
      `}</style>
      <button
        onClick={inviteAgent}
        disabled={loading || joined}
        className={`invite-agent-btn ${loading || joined ? 'state-disabled' : 'state-default'}`}
      >
        {joined ? (
          <>
            <span style={{ color: '#4ade80' }}>●</span> Agent Joined
          </>
        ) : loading ? (
          <>
            <span>⏳</span> Inviting...
          </>
        ) : (
          <>
            <span>🤖</span> Invite AI Agent
          </>
        )}
      </button>
    </>
  );
}
