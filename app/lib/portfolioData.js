// Default portfolio data
export const DEFAULT_DATA = {
  personal: {
    name: 'Edimar Mosquida',
    tagline: 'IoT Developer · Full-Stack Engineer · AI Enthusiast',
    location: 'Cagayan de Oro City, Philippines',
    email: 'edimar.mosquida@example.com',
    github: 'github.com/Edimar18',
    summary:
      'A 3rd-year BSIT student specializing in Internet of Things. I build embedded systems, AI-powered applications, and full-stack solutions — with a strong conviction that technology should serve communities.',
    education: {
      degree: 'BS Information Technology — IoT Track',
      school: 'University of Science and Technology of Southern Philippines',
      campus: 'CDO Campus · 3rd Year',
    },
  },
  skills: [
    {
      category: 'Software Development',
      icon: '⟨/⟩',
      color: '#C8FF00',
      items: [
        { name: 'React Native (Expo)', level: 85 },
        { name: 'Flutter', level: 80 },
        { name: 'Firebase', level: 78 },
        { name: 'Django REST', level: 82 },
        { name: 'Next.js', level: 72 },
      ],
    },
    {
      category: 'IoT & Hardware',
      icon: '⚡',
      color: '#FFB800',
      items: [
        { name: 'ESP32 & ESP8266', level: 90 },
        { name: 'Orange Pi Zero 3', level: 75 },
        { name: 'LoRa Modules', level: 70 },
        { name: 'Sensor Fusion (MQ-7, DHT22, ACS712)', level: 85 },
      ],
    },
    {
      category: 'Artificial Intelligence',
      icon: '◈',
      color: '#00D4FF',
      items: [
        { name: 'Computer Vision / YOLOv8', level: 76 },
        { name: 'TinyML & Edge Impulse', level: 72 },
        { name: 'Model Training (Classification)', level: 74 },
      ],
    },
    {
      category: 'Cybersecurity',
      icon: '⛨',
      color: '#FF4444',
      items: [
        { name: 'Ethical Hacking & Vuln Testing', level: 70 },
        { name: 'Wireshark / Burp Suite', level: 73 },
        { name: 'Network Reconnaissance', level: 68 },
        { name: 'IDS/IPS Concepts', level: 65 },
      ],
    },
  ],
  projects: [
    {
      id: '01',
      name: 'Project I.S.O.R.T.',
      full: 'Iskolar Smart Operations for Recycling & Tracking',
      role: 'Lead Developer · IoT Engineer',
      description:
        'An AI-powered trash classification IoT system acting as an Environmental Mentor for communities. YOLOv8 vision model identifies waste categories in real-time and guides correct bin placement.',
      tags: ['YOLOv8', 'ESP32', 'TinyML', 'Computer Vision', 'IoT'],
      accent: '#C8FF00',
    },
    {
      id: '02',
      name: 'PREVENTA',
      full: 'Multi-Sensor Residential Fire Detection System',
      role: 'Systems Developer',
      description:
        'A capstone IoT system using ESP32, MQ-7, DHT22, and ACS712 sensors with Django REST backend and Firebase FCM push alerts. Edge-AI smoke classification via ESP32-CAM for early hazard warning.',
      tags: ['ESP32', 'Django', 'Firebase', 'MQ-7', 'GSM', 'PWA'],
      accent: '#FF4444',
    },
    {
      id: '03',
      name: 'Roomoro',
      full: 'Boarding House Listing App for CDO',
      role: 'Mobile Developer',
      description:
        'A Flutter mobile application helping newcomers in Cagayan de Oro City find verified pad and boarding houses. Features map integration, owner profiles, and in-app messaging.',
      tags: ['Flutter', 'Firebase', 'Google Maps', 'Mobile'],
      accent: '#00D4FF',
    },
    {
      id: '04',
      name: 'Insightify',
      full: 'SME Business Intelligence Dashboard',
      role: 'Mobile Developer',
      description:
        'React Native business intelligence app giving small and medium enterprises clear visualizations of revenues, expenses, and delivery logs. Built to democratize data for non-technical business owners.',
      tags: ['React Native', 'Expo', 'Firebase', 'Charts', 'BI'],
      accent: '#FFB800',
    },
  ],
  experience: [
    {
      id: 'exp1',
      title: 'Chairperson',
      org: 'ISDA — Iskolar ng Dakbayan Tignapoloan Association',
      period: '2024 — Present',
      description:
        'Leads a team of officers to plan and execute community events, including general assemblies for barangay scholars. Manages logistics, communications, and community welfare programs.',
    },
    {
      id: 'exp2',
      title: 'E-games Committee Head',
      org: 'Local Event Organizing Committee',
      period: '2023 — Present',
      description:
        'Manages player tryouts, defines role-specific evaluation metrics, and oversees OBS-powered livestream broadcasting for Mobile Legends: Bang Bang tournaments.',
    },
    {
      id: 'exp3',
      title: 'Youth Leader Head',
      org: 'PYCC — Dansolihon Parish Youth Coordinating Council',
      period: '2023 — Present',
      description:
        'Coordinates youth activities across a three-tier parish structure. Built digital tools (Flutter app + Next.js dashboard) to modernize attendance tracking and activity management.',
    },
  ],
  floatTags: [
    { text: 'ESP32', style: { top: '18%', left: '5%', '--dur': '5s', '--delay': '0s' } },
    { text: 'YOLOv8', style: { top: '30%', right: '6%', '--dur': '4.5s', '--delay': '0.5s' } },
    { text: 'Flutter', style: { top: '62%', left: '4%', '--dur': '6s', '--delay': '1s' } },
    { text: 'Django', style: { top: '72%', right: '8%', '--dur': '5.5s', '--delay': '0.3s' } },
    { text: 'TinyML', style: { top: '80%', left: '12%', '--dur': '4s', '--delay': '0.8s' } },
    { text: 'Firebase', style: { top: '45%', right: '3%', '--dur': '6.5s', '--delay': '1.5s' } },
  ],
}

// Storage key
const STORAGE_KEY = 'portfolio_data_v1'
const ADMIN_PASSWORD_KEY = 'portfolio_admin_pw'

// Simple hash function for password
function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

// Get data from localStorage or return default
export function getPortfolioData() {
  if (typeof window === 'undefined') return DEFAULT_DATA
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Deep merge with defaults to ensure all fields exist
      return {
        personal: { ...DEFAULT_DATA.personal, ...parsed.personal },
        skills: parsed.skills || DEFAULT_DATA.skills,
        projects: parsed.projects || DEFAULT_DATA.projects,
        experience: parsed.experience || DEFAULT_DATA.experience,
        floatTags: parsed.floatTags || DEFAULT_DATA.floatTags,
      }
    }
  } catch (e) {
    console.error('Error loading portfolio data:', e)
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY)
  }
  return DEFAULT_DATA
}

// Save data to localStorage
export function savePortfolioData(data) {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (e) {
    console.error('Error saving portfolio data:', e)
    return false
  }
}

// Reset to defaults
export function resetPortfolioData() {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.error('Error resetting portfolio data:', e)
    return false
  }
}

// Admin password management
export function setAdminPassword(password) {
  if (typeof window === 'undefined') return false
  if (!password || password.length < 6) return false
  
  try {
    const hashed = simpleHash(password)
    localStorage.setItem(ADMIN_PASSWORD_KEY, hashed)
    return true
  } catch (e) {
    console.error('Error setting admin password:', e)
    return false
  }
}

export function verifyAdminPassword(password) {
  if (typeof window === 'undefined') return false
  
  try {
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY)
    if (!stored) return false // No password set
    
    const hashed = simpleHash(password)
    return stored === hashed
  } catch (e) {
    console.error('Error verifying admin password:', e)
    return false
  }
}

export function hasAdminPassword() {
  if (typeof window === 'undefined') return false
  
  try {
    return !!localStorage.getItem(ADMIN_PASSWORD_KEY)
  } catch (e) {
    return false
  }
}

// Session management
const SESSION_KEY = 'portfolio_admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export function createAdminSession() {
  if (typeof window === 'undefined') return false
  
  try {
    const session = {
      timestamp: Date.now(),
      expires: Date.now() + SESSION_DURATION,
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return true
  } catch (e) {
    console.error('Error creating admin session:', e)
    return false
  }
}

export function verifyAdminSession() {
  if (typeof window === 'undefined') return false
  
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (!stored) return false
    
    const session = JSON.parse(stored)
    if (Date.now() > session.expires) {
      localStorage.removeItem(SESSION_KEY)
      return false
    }
    return true
  } catch (e) {
    console.error('Error verifying admin session:', e)
    return false
  }
}

export function clearAdminSession() {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.removeItem(SESSION_KEY)
    return true
  } catch (e) {
    console.error('Error clearing admin session:', e)
    return false
  }
}

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
