'use client'

import { useState, useEffect } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'

export default function PersonalInfoPage() {
  const { data, updatePersonal, updateEducation } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    location: '',
    email: '',
    github: '',
    summary: '',
    education: {
      degree: '',
      school: '',
      campus: '',
    },
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState(null)

  useEffect(() => {
    setFormData({
      name: data.personal.name,
      tagline: data.personal.tagline,
      location: data.personal.location,
      email: data.personal.email,
      github: data.personal.github,
      summary: data.personal.summary,
      education: { ...data.personal.education },
    })
  }, [data.personal])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSaveMessage(null)
  }

  const handleEducationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: value },
    }))
    setSaveMessage(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    updatePersonal({
      name: formData.name,
      tagline: formData.tagline,
      location: formData.location,
      email: formData.email,
      github: formData.github,
      summary: formData.summary,
    })
    updateEducation(formData.education)
    
    // Simulate save delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsSaving(false)
    setSaveMessage({ type: 'success', text: 'Changes saved successfully!' })
    
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const hasChanges =
    formData.name !== data.personal.name ||
    formData.tagline !== data.personal.tagline ||
    formData.location !== data.personal.location ||
    formData.email !== data.personal.email ||
    formData.github !== data.personal.github ||
    formData.summary !== data.personal.summary ||
    formData.education.degree !== data.personal.education.degree ||
    formData.education.school !== data.personal.education.school ||
    formData.education.campus !== data.personal.education.campus

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
            Personal Information
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--muted)',
            }}
          >
            Update your profile details and education information
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          style={{
            padding: '14px 28px',
            background: hasChanges ? 'var(--accent)' : 'var(--surface-2)',
            border: 'none',
            borderRadius: '8px',
            color: hasChanges ? 'var(--bg)' : 'var(--muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: hasChanges ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (hasChanges) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 24px rgba(200, 255, 0, 0.25)'
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
        >
          {isSaving ? (
            <>
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid var(--bg)',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {saveMessage && (
        <div
          style={{
            padding: '16px 20px',
            background:
              saveMessage.type === 'success'
                ? 'rgba(200, 255, 0, 0.1)'
                : 'rgba(255, 68, 68, 0.1)',
            border: `1px solid ${
              saveMessage.type === 'success'
                ? 'rgba(200, 255, 0, 0.3)'
                : 'rgba(255, 68, 68, 0.3)'
            }`,
            borderRadius: '8px',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color:
                saveMessage.type === 'success'
                  ? 'var(--accent)'
                  : 'var(--red)',
              margin: 0,
            }}
          >
            {saveMessage.text}
          </p>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gap: '24px',
        }}
      >
        {/* Basic Info */}
        <div
          style={{
            padding: '32px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '18px',
              color: 'var(--text)',
              marginBottom: '24px',
            }}
          >
            Basic Information
          </h2>
          <div
            style={{
              display: 'grid',
              gap: '20px',
            }}
          >
            <FormField
              label="Full Name"
              value={formData.name}
              onChange={(v) => handleChange('name', v)}
              placeholder="Your full name"
            />
            <FormField
              label="Tagline"
              value={formData.tagline}
              onChange={(v) => handleChange('tagline', v)}
              placeholder="e.g., IoT Developer · Full-Stack Engineer"
            />
            <FormField
              label="Location"
              value={formData.location}
              onChange={(v) => handleChange('location', v)}
              placeholder="Your location"
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              <FormField
                label="Email"
                value={formData.email}
                onChange={(v) => handleChange('email', v)}
                placeholder="your@email.com"
                type="email"
              />
              <FormField
                label="GitHub"
                value={formData.github}
                onChange={(v) => handleChange('github', v)}
                placeholder="github.com/username"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div
          style={{
            padding: '32px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '18px',
              color: 'var(--text)',
              marginBottom: '24px',
            }}
          >
            Summary
          </h2>
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
              Bio / Summary
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Write a brief summary about yourself..."
              rows={5}
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
                minHeight: '120px',
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
        </div>

        {/* Education */}
        <div
          style={{
            padding: '32px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '18px',
              color: 'var(--text)',
              marginBottom: '24px',
            }}
          >
            Education
          </h2>
          <div
            style={{
              display: 'grid',
              gap: '20px',
            }}
          >
            <FormField
              label="Degree"
              value={formData.education.degree}
              onChange={(v) => handleEducationChange('degree', v)}
              placeholder="e.g., BS Information Technology — IoT Track"
            />
            <FormField
              label="School"
              value={formData.education.school}
              onChange={(v) => handleEducationChange('school', v)}
              placeholder="University name"
            />
            <FormField
              label="Campus / Details"
              value={formData.education.campus}
              onChange={(v) => handleEducationChange('campus', v)}
              placeholder="e.g., CDO Campus · 3rd Year"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, placeholder, type = 'text' }) {
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
        type={type}
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
