'use client'

import { useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'
import { resetPortfolioData } from '../../lib/portfolioData'

export default function SettingsPage() {
  const { resetData } = usePortfolio()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetInput, setResetInput] = useState('')
  const [message, setMessage] = useState(null)

  const handleReset = () => {
    if (resetInput === 'RESET') {
      resetData()
      setMessage({ type: 'success', text: 'All data has been reset to defaults.' })
      setShowResetConfirm(false)
      setResetInput('')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleClearStorage = () => {
    if (confirm('This will clear all saved data including your admin password. Are you sure?')) {
      localStorage.clear()
      setMessage({ type: 'success', text: 'All local storage cleared. Please refresh the page.' })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '32px', color: 'var(--text)', marginBottom: '8px' }}>
        Settings
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '32px' }}>
        Manage your admin panel settings and data
      </p>

      {message && (
        <div style={{ padding: '16px 20px', background: message.type === 'success' ? 'rgba(200, 255, 0, 0.1)' : 'rgba(255, 68, 68, 0.1)', border: `1px solid ${message.type === 'success' ? 'rgba(200, 255, 0, 0.3)' : 'rgba(255, 68, 68, 0.3)'}`, borderRadius: '8px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: message.type === 'success' ? 'var(--accent)' : 'var(--red)', margin: 0 }}>{message.text}</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Reset Data */}
        <div style={{ padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '12px' }}>Reset Data</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px', lineHeight: 1.6 }}>
            Reset all portfolio data to the original defaults. This will remove all your customizations.
          </p>
          
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              style={{ padding: '12px 24px', background: 'rgba(255, 68, 68, 0.1)', border: '1px solid var(--red)', borderRadius: '8px', color: 'var(--red)', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
            >
              Reset to Defaults
            </button>
          ) : (
            <div style={{ padding: '20px', background: 'rgba(255, 68, 68, 0.05)', border: '1px solid var(--red)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--red)', marginBottom: '12px' }}>
                ⚠️ This action cannot be undone. Type "RESET" to confirm:
              </p>
              <input
                type="text"
                value={resetInput}
                onChange={(e) => setResetInput(e.target.value)}
                placeholder="Type RESET"
                style={{ width: '200px', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--red)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px', marginRight: '12px' }}
              />
              <button
                onClick={handleReset}
                disabled={resetInput !== 'RESET'}
                style={{ padding: '12px 24px', background: resetInput === 'RESET' ? 'var(--red)' : 'var(--surface-2)', border: 'none', borderRadius: '8px', color: resetInput === 'RESET' ? 'var(--text)' : 'var(--muted)', cursor: resetInput === 'RESET' ? 'pointer' : 'not-allowed', fontSize: '14px', fontWeight: 600 }}
              >
                Confirm Reset
              </button>
              <button
                onClick={() => { setShowResetConfirm(false); setResetInput('') }}
                style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--muted)', cursor: 'pointer', fontSize: '14px', marginLeft: '8px' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Clear Storage */}
        <div style={{ padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '12px' }}>Clear All Storage</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px', lineHeight: 1.6 }}>
            Clear all localStorage data including portfolio data and admin password. You will need to set up the admin panel again.
          </p>
          <button
            onClick={handleClearStorage}
            style={{ padding: '12px 24px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', cursor: 'pointer', fontSize: '14px' }}
          >
            Clear All Storage
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '12px' }}>About</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
            This admin panel stores all data locally in your browser using localStorage. 
            No data is sent to any server. Your admin password is hashed before storage.
          </p>
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg)', borderRadius: '8px' }}>
            <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: 0 }}>
              Storage Key: portfolio_data_v1<br />
              Session Duration: 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
