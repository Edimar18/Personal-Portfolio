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

export default function ProjectsPage() {
  const { data, addProject, updateProject, deleteProject } = usePortfolio()
  const [editingId, setEditingId] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    full: '',
    role: '',
    description: '',
    tags: [],
    accent: '#C8FF00',
  })
  const [tagInput, setTagInput] = useState('')

  const resetForm = () => {
    setFormData({
      name: '',
      full: '',
      role: '',
      description: '',
      tags: [],
      accent: '#C8FF00',
    })
    setTagInput('')
  }

  const handleEdit = (project) => {
    setFormData({ ...project })
    setEditingId(project.id)
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
    if (!formData.name.trim() || !formData.description.trim()) return

    if (editingId) {
      updateProject(editingId, formData)
      setEditingId(null)
    } else {
      addProject(formData)
      setIsCreating(false)
    }
    resetForm()
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id)
      if (editingId === id) {
        setEditingId(null)
        resetForm()
      }
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput('')
    }
  }

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: '32px',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Projects
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--muted)',
            }}
          >
            Manage your portfolio projects ({data.projects.length} total)
          </p>
        </div>
        <button
          onClick={handleCreate}
          disabled={isCreating || editingId !== null}
          style={{
            padding: '14px 24px',
            background:
              isCreating || editingId !== null
                ? 'var(--surface-2)'
                : 'var(--accent)',
            border: 'none',
            borderRadius: '8px',
            color:
              isCreating || editingId !== null ? 'var(--muted)' : 'var(--bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor:
              isCreating || editingId !== null ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (!(isCreating || editingId !== null)) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow =
                '0 8px 24px rgba(200, 255, 0, 0.25)'
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
        >
          <span>+</span> Add Project
        </button>
      </div>

      {/* Project Form */}
      {(isCreating || editingId !== null) && (
        <div
          style={{
            padding: '32px',
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            borderRadius: '12px',
            marginBottom: '32px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '20px',
              color: 'var(--text)',
              marginBottom: '24px',
            }}
          >
            {editingId ? 'Edit Project' : 'New Project'}
          </h2>

          <div
            style={{
              display: 'grid',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              <FormField
                label="Project Name"
                value={formData.name}
                onChange={(v) =>
                  setFormData((prev) => ({ ...prev, name: v }))
                }
                placeholder="e.g., Project I.S.O.R.T."
              />
              <FormField
                label="Full Title"
                value={formData.full}
                onChange={(v) =>
                  setFormData((prev) => ({ ...prev, full: v }))
                }
                placeholder="Full descriptive title"
              />
            </div>

            <FormField
              label="Your Role"
              value={formData.role}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, role: v }))
              }
              placeholder="e.g., Lead Developer · IoT Engineer"
            />

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '8px',
                }}
              >
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe the project..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text)',
                  fontSize: '15px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '100px',
                  lineHeight: 1.6,
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = 'var(--accent)')
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = 'var(--border)')
                }
              />
            </div>

            {/* Tags */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '8px',
                }}
              >
                Tags
              </label>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--accent)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: 'var(--accent)',
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '0',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  placeholder="Add a tag and press Enter"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = 'var(--accent)')
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'var(--border)')
                  }
                />
                <button
                  onClick={addTag}
                  style={{
                    padding: '12px 20px',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '12px',
                }}
              >
                Accent Color
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, accent: color.value }))
                    }
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: color.value,
                      border:
                        formData.accent === color.value
                          ? '3px solid var(--text)'
                          : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    title={color.label}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = 'scale(1.1)')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = 'scale(1)')
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <button
              onClick={handleSave}
              disabled={!formData.name.trim() || !formData.description.trim()}
              style={{
                padding: '14px 28px',
                background:
                  !formData.name.trim() || !formData.description.trim()
                    ? 'var(--surface-2)'
                    : 'var(--accent)',
                border: 'none',
                borderRadius: '8px',
                color:
                  !formData.name.trim() || !formData.description.trim()
                    ? 'var(--muted)'
                    : 'var(--bg)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor:
                  !formData.name.trim() || !formData.description.trim()
                    ? 'not-allowed'
                    : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (formData.name.trim() && formData.description.trim()) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow =
                    '0 8px 24px rgba(200, 255, 0, 0.25)'
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              {editingId ? 'Save Changes' : 'Create Project'}
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '14px 28px',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--text)'
                e.target.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.color = 'var(--muted)'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {data.projects.map((project, index) => (
          <div
            key={project.id}
            style={{
              padding: '24px',
              background: 'var(--surface)',
              border: `1px solid ${
                editingId === project.id ? 'var(--accent)' : 'var(--border)'
              }`,
              borderRadius: '12px',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              transition: 'all 0.2s',
            }}
          >
            {/* Number */}
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: '32px',
                color: project.accent,
                minWidth: '50px',
                textAlign: 'center',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: '18px',
                      color: 'var(--text)',
                      marginBottom: '4px',
                    }}
                  >
                    {project.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    {project.full}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(project)}
                    disabled={isCreating || editingId !== null}
                    style={{
                      padding: '8px 16px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text)',
                      cursor:
                        isCreating || editingId !== null
                          ? 'not-allowed'
                          : 'pointer',
                      fontSize: '13px',
                      opacity: isCreating || editingId !== null ? 0.5 : 1,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={isCreating || editingId !== null}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(255, 68, 68, 0.1)',
                      border: '1px solid var(--red)',
                      borderRadius: '6px',
                      color: 'var(--red)',
                      cursor:
                        isCreating || editingId !== null
                          ? 'not-allowed'
                          : 'pointer',
                      fontSize: '13px',
                      opacity: isCreating || editingId !== null ? 0.5 : 1,
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '12px',
                }}
              >
                {project.description.slice(0, 120)}...
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                }}
              >
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 10px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      color: 'var(--muted)',
                    }}
                  >
                    +{project.tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {data.projects.length === 0 && (
          <div
            style={{
              padding: '48px',
              textAlign: 'center',
              background: 'var(--surface)',
              border: '1px dashed var(--border)',
              borderRadius: '12px',
            }}
          >
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              No projects yet. Click "Add Project" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '8px',
        }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text)',
          fontSize: '15px',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) =>
          (e.target.style.borderColor = 'var(--accent)')
        }
        onBlur={(e) =>
          (e.target.style.borderColor = 'var(--border)')
        }
      />
    </div>
  )
}
