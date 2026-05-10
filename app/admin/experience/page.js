'use client'

import { useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'

export default function ExperiencePage() {
  const { data, addExperience, updateExperience, deleteExperience } = usePortfolio()
  const [editingId, setEditingId] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    org: '',
    period: '',
    description: '',
  })

  const resetForm = () => {
    setFormData({ title: '', org: '', period: '', description: '' })
  }

  const handleEdit = (exp) => {
    setFormData({ ...exp })
    setEditingId(exp.id)
    setIsCreating(false)
  }

  const handleCreate = () => {
    resetForm()
    setEditingId(null)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsCreating(false)
    resetForm()
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.org.trim()) return

    if (editingId) {
      updateExperience(editingId, formData)
      setEditingId(null)
    } else {
      addExperience(formData)
      setIsCreating(false)
    }
    resetForm()
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id)
      if (editingId === id) {
        setEditingId(null)
        resetForm()
      }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '32px', color: 'var(--text)', marginBottom: '8px' }}>
            Experience
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--muted)' }}>
            Manage your work history and leadership roles ({data.experience.length} total)
          </p>
        </div>
        <button
          onClick={handleCreate}
          disabled={isCreating || editingId !== null}
          style={{
            padding: '14px 24px',
            background: isCreating || editingId !== null ? 'var(--surface-2)' : 'var(--accent)',
            border: 'none',
            borderRadius: '8px',
            color: isCreating || editingId !== null ? 'var(--muted)' : 'var(--bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: isCreating || editingId !== null ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>+</span> Add Experience
        </button>
      </div>

      {/* Form */}
      {(isCreating || editingId !== null) && (
        <div style={{ padding: '32px', background: 'var(--surface)', border: '1px solid var(--accent)', borderRadius: '12px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '24px' }}>
            {editingId ? 'Edit Experience' : 'New Experience'}
          </h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <FormField
                label="Title / Position"
                value={formData.title}
                onChange={(v) => setFormData(prev => ({ ...prev, title: v }))}
                placeholder="e.g., Chairperson"
              />
              <FormField
                label="Organization"
                value={formData.org}
                onChange={(v) => setFormData(prev => ({ ...prev, org: v }))}
                placeholder="e.g., ISDA — Iskolar ng Dakbayan"
              />
            </div>
            <FormField
              label="Period"
              value={formData.period}
              onChange={(v) => setFormData(prev => ({ ...prev, period: v }))}
              placeholder="e.g., 2024 — Present"
            />
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
                style={{ width: '100%', padding: '14px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', minHeight: '100px', lineHeight: 1.6 }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={handleSave}
              disabled={!formData.title.trim() || !formData.org.trim()}
              style={{
                padding: '14px 28px',
                background: !formData.title.trim() || !formData.org.trim() ? 'var(--surface-2)' : 'var(--accent)',
                border: 'none',
                borderRadius: '8px',
                color: !formData.title.trim() || !formData.org.trim() ? 'var(--muted)' : 'var(--bg)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: !formData.title.trim() || !formData.org.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {editingId ? 'Save Changes' : 'Add Experience'}
            </button>
            <button
              onClick={handleCancel}
              style={{ padding: '14px 28px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.experience.map((exp, index) => (
          <div key={exp.id} style={{ padding: '24px', background: 'var(--surface)', border: `1px solid ${editingId === exp.id ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>{exp.period}</div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '4px' }}>{exp.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--accent)' }}>{exp.org}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(exp)}
                  disabled={isCreating || editingId !== null}
                  style={{ padding: '10px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)', cursor: isCreating || editingId !== null ? 'not-allowed' : 'pointer', fontSize: '13px', opacity: isCreating || editingId !== null ? 0.5 : 1 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  disabled={isCreating || editingId !== null}
                  style={{ padding: '10px 16px', background: 'rgba(255, 68, 68, 0.1)', border: '1px solid var(--red)', borderRadius: '6px', color: 'var(--red)', cursor: isCreating || editingId !== null ? 'not-allowed' : 'pointer', fontSize: '13px', opacity: isCreating || editingId !== null ? 0.5 : 1 }}
                >
                  Delete
                </button>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{exp.description}</p>
          </div>
        ))}

        {data.experience.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: '12px' }}>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>No experience entries yet. Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '14px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none' }}
      />
    </div>
  )
}
