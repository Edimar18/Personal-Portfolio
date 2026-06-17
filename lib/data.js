// ---------------------------------------------------------------
// All portfolio content lives here. Edit this file to update your
// site — you should not need to touch the component files for
// ordinary content changes.
//
// Fields wrapped like "[Add ...]" are placeholders pulled directly
// from your resume where the source data wasn't filled in. Replace
// them with real values before you publish.
// ---------------------------------------------------------------

export const profile = {
  name: 'Edimar Mosquida',
  location: 'Cagayan de Oro City, Philippines',
  phone: '0965 926 8288',
  email: 'mosquida.edimar.18@gmail.com',
  github: 'https://github.com/Edimar18',
  linkedin: 'https://linkedin.com/in/Edimar',
  role: 'IT STUDENT — IOT SPECIALIZATION',
  statement:
    'Results-driven IT student bridging hardware and software — deploying sensor-driven embedded systems and cross-platform mobile applications from prototype to production.',
};

// "plate" controls which placeholder visual-proof pattern renders
// behind each project card: circuit | scanline | wireframe | halftone
export const projects = [
  {
    code: 'P-01',
    name: 'PREVENTA',
    subtitle: '(formerly FireOff)',
    role: 'Lead IoT Developer',
    description:
      'A multi-sensor residential fire-hazard prediction system. An ESP32 microcontroller processes environmental data in real time, while a Django backend ingests, routes, and surfaces telemetry to end users through predictive gas and temperature thresholds.',
    tech: ['ESP32', 'Django', 'Python', 'MQ-7', 'DHT22', 'ACS712'],
    github: 'https://github.com/Edimar18',
    plate: 'circuit',
  },
  {
    code: 'P-02',
    name: 'Project I.S.O.R.T.',
    subtitle: 'AI-Powered Environmental Mentor',
    role: 'AI & Systems Developer',
    description:
      'A smart-bin system that performs autonomous trash classification to close local recycling behavior gaps. A custom YOLOv8 model was trained and optimized for hardware-constrained edge inference, paired with a live dashboard for recycling metrics.',
    tech: ['YOLOv8', 'Edge Impulse', 'Orange Pi', 'Python'],
    github: 'https://github.com/Edimar18',
    plate: 'scanline',
  },
  {
    code: 'P-03',
    name: 'Insightify',
    subtitle: 'Business Intelligence App',
    role: 'Mobile Frontend Developer',
    description:
      'A business intelligence mobile app for small and medium enterprises to visualize revenue, expenses, and delivery logs. Built with responsive cross-platform UI and real-time database syncing for live financial analytics.',
    tech: ['React Native', 'Expo', 'JavaScript', 'Firebase'],
    github: 'https://github.com/Edimar18',
    plate: 'wireframe',
  },
  {
    code: 'P-04',
    name: 'Roomoro',
    subtitle: 'Pad & Boarding House Finder',
    role: 'Application Developer',
    description:
      'A pad and boarding-house listing app built to simplify the accommodation search for newcomers in Cagayan de Oro, with search, filtering, and geolocation matching for suitable housing.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/Edimar18',
    plate: 'halftone',
  },
];

export const leadership = [
  {
    org: 'ISDA Tignapoloan Association',
    role: 'Chairperson',
    period: '[Month, Year] — Present',
    location: 'Cagayan de Oro City',
    summary:
      'Leads a team including the Vice Chairperson and Secretary to execute community initiatives and academic support programs for local scholars.',
    achievements: [
      'Orchestrated the annual General Assembly — logistics, communications, and scheduling',
      'Bridged technical constraints with community-focused goals across stakeholders',
    ],
    skills: ['Team Leadership', 'Event Logistics', 'Cross-functional Communication'],
    plate: 'halftone',
  },
  {
    org: 'PYCC — Dansolihon Parish',
    role: 'Youth Coordinator',
    period: '[Add dates]',
    location: 'Dansolihon, Cagayan de Oro City',
    summary:
      'Coordination and leadership role within the Parish Youth Coordinating Council, supporting youth ministry programs across the parish.',
    achievements: [
      '[Add a specific program, event, or initiative you coordinated]',
      '[Add a measurable outcome — attendance, chapters reached, programs launched]',
    ],
    skills: ['Coordination', 'Community Organizing', 'Public Speaking'],
    plate: 'halftone',
  },
];

export const education = [
  {
    institution: 'University of Science and Technology of Southern Philippines (USTP) — CDO',
    degree: 'Bachelor of Science in Information Technology — IoT Track',
    period: 'Expected Graduation: [Month, Year]',
    detail: 'Relevant coursework: Embedded Systems, Mobile App Development, Artificial Intelligence, Systems Architecture.',
  },
];

export const softSkills = [
  { name: 'Communication', note: 'Translating technical constraints for non-technical stakeholders' },
  { name: 'Leadership', note: 'Directing teams toward a shared deliverable under deadline' },
  { name: 'Problem Solving', note: 'Diagnosing failures across both hardware and software layers' },
  { name: 'Collaboration', note: 'Working across design, backend, and embedded disciplines' },
  { name: 'Adaptability', note: 'Shipping across iOS, Android, and constrained edge hardware' },
  { name: 'Project Management', note: 'Owning a project from prototype through deployment' },
];

// No certificates were supplied — add real ones here as you earn them.
// Example shape:
// { name: 'Certificate Name', org: 'Issuing Organization', date: 'Mon YYYY' }
export const certificates = [];
