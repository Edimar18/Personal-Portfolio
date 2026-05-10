'use client'

import { useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'

const ACCENT_COLORS = [
  { value: '#C8FF00', label: 'Lime' },
  { value: '#FF4444', label: 'Red' },
  { value: '#00D4FF', label: 'Cyan' },
  { value: '#FFB800', label: 'Orange' },
  { value: '#FF6B9D', label: 'Pink' },
  { value: '#9D4EDD', label: 'Purple' },
]

const ICONS = ['⟨/⟩', '⚡', '◈', '⛨', '🔧', '📱', '☁️', '🤖', '🔒', '🎨']

export default function SkillsPage() {
  const { data, updateSkillCategory, updateSkillItem, addSkillItem, deleteSkillItem } = usePortfolio()
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingSkill, setEditingSkill] = useState(null)
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillLevel, setNewSkillLevel] = useState(50)

  const handleUpdateCategory = (catIndex, field, value) => {
    updateSkillCategory(catIndex, { [field]: value })
  }

  const handleUpdateSkill = (catIndex, skillIndex, field, value) => {
    updateSkillItem(catIndex, skillIndex, { [field]: value })
  }

  const handleAddSkill = (catIndex) => {
    if (newSkillName.trim()) {
      addSkillItem(catIndex, { name: newSkillName.trim(), level: newSkillLevel })
      setNewSkillName('')
      setNewSkillLevel(50)
      setEditingSkill(null)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '32px', color: 'var(--text)', marginBottom: '8px' }}>
          Skills
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--muted)' }}>
          Manage your skill categories and proficiency levels
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.skills.map((category, catIndex) => (
          <div key={category.category} style={{ padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
            {/* Category Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <select
                  value={category.icon}
                  onChange={(e) => handleUpdateCategory(catIndex, 'icon', e.target.value)}
                  style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '20px', cursor: 'pointer' }}
                >
                  {ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
                <input
                  type="text"
                  value={category.category}
                  onChange={(e) => handleUpdateCategory(catIndex, 'category', e.target.value)}
                  style={{ padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '16px', fontFamily: 'var(--font-syne)', fontWeight: 700, minWidth: '200px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => handleUpdateCategory(catIndex, 'color', color.value)}
                    style={{ width: '28px', height: '28px', borderRadius: '6px', background: color.value, border: category.color === color.value ? '3px solid var(--text)' : '2px solid transparent', cursor: 'pointer' }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Skills List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {category.items.map((skill, skillIndex) => (
                <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleUpdateSkill(catIndex, skillIndex, 'name', e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '140px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => handleUpdateSkill(catIndex, skillIndex, 'level', parseInt(e.target.value))}
                      style={{ flex: 1, accentColor: category.color }}
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: category.color, minWidth: '36px' }}>{skill.level}%</span>
                  </div>
                  <button
                    onClick={() => deleteSkillItem(catIndex, skillIndex)}
                    style={{ padding: '10px 14px', background: 'rgba(255, 68, 68, 0.1)', border: '1px solid var(--red)', borderRadius: '6px', color: 'var(--red)', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Skill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="New skill name..."
                style={{ flex: 1, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px' }}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(catIndex)}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '140px' }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: category.color }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: category.color, minWidth: '36px' }}>{newSkillLevel}%</span>
              </div>
              <button
                onClick={() => handleAddSkill(catIndex)}
                disabled={!newSkillName.trim()}
                style={{ padding: '12px 20px', background: 'var(--accent)', border: 'none', borderRadius: '8px', color: 'var(--bg)', cursor: newSkillName.trim() ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: '13px', opacity: newSkillName.trim() ? 1 : 0.5 }}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
