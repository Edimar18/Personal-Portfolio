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
    image: 'preventa.jpg',
  },
  {
    code: 'P-02',
    name: 'Project I.S.O.R.T.',
    subtitle: 'AI-Powered Environmental Mentor',
    role: 'AI & Systems Developer',
    description:
      'A smart-bin system that performs autonomous trash classification to close local recycling behavior gaps. A custom YOLOv8 model was trained and optimized for hardware-constrained edge inference, paired with a live dashboard for recycling metrics.',
    tech: ['YOLOv8', 'Edge Impulse', 'Orange Pi', 'Python'],
    github: 'https://github.com/Edimar18/PROJECT-I-S.O.R.T', 
    plate: 'scanline',
    image: 'isort.jpg',
  },
  {
    code: 'P-03',
    name: 'PyCC Chapel Monitoring App',
    subtitle: 'A parish Youth Activity Monitoring App',
    role: 'developer',
    description:
      'A mobile app built for the Parish Youth Coordinating Council of the Dansolihon Parish, designed to streamline the monitoring and coordination of youth activities across the parish. The app features offline-first functionality for attendance recording and zip bundle export for montly reports.',
    tech: ['Flutter', 'Dart', 'SQLite'],
    github: 'https://github.com/Edimar18',
    plate: 'wireframe',
    image: 'pycc_chapel_monitoring_app.jpg',
  },
  {
    code: 'P-04',
    name: 'Roomoro',
    subtitle: 'Pad & Boarding House Finder',
    role: 'Application Developer',
    description:
      'A pad and boarding-house listing app built to simplify the accommodation search for newcomers in Cagayan de Oro, with search, filtering, and geolocation matching for suitable housing.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/Edimar18/Roomoro',
    plate: 'halftone',
    image: 'roomoro.jpg',
  },
];

export const leadership = [
  {
    org: 'ISDA Tignapoloan Association',
    role: 'Chairperson',
    period: '2025 - 2026',
    location: 'Tignapoloan, Cagayan de Oro City',
    summary:
      'Leads a team including the Vice Chairperson and Secretary to execute community initiatives and academic support programs for local scholars.',
    achievements: [
      'Orchestrated the annual General Assembly — logistics, communications, and scheduling',
      'Bridged technical constraints with community-focused goals across stakeholders',
    ],
    skills: ['Team Leadership', 'Event Logistics', 'Cross-functional Communication'],
    plate: 'halftone',
    image: 'isda_chairperson.jpg',
  },
  {
    org: 'PYCC — Dansolihon Parish',
    role: 'Youth Leaderhead',
    period: '2023 - Present',
    location: 'Dansolihon, Cagayan de Oro City',
    summary:
      'Coordination and leadership role within the Parish Youth Coordinating Council, supporting youth ministry programs across the parish.',
    achievements: [
      'developed a custom mobile app to streamline attendance tracking and reporting for youth activities across the parish',
      'facilitated communication and coordination among youth leaders across multiple chapels',
    ],
    skills: ['Coordination', 'Community Organizing', 'Public Speaking'],
    plate: 'halftone',
    image: 'pycc_youth_leaderhead.jpg', // Add path here, e.g., '/leadership/pycc.jpg'
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
// { name: 'Certificate Name', org: 'Issuing Organization', date: 'Mon YYYY', image: '/certs/example.jpg' }
export const certificates = [
  { name: 'Introduction to Artificial Intelligence, Machine Learning, and Deep Learning', org: 'DICT Region X', date: 'Oct 2025', image: 'Certificate-AIML-24.jpg', plate: 'halftone' },
  { name: 'Software Development and Design Thinking', org: 'DICT Region X', date: 'Sep 2025', image: 'Certificate-SDDT-50.jpg', plate: 'halftone' },
  { name: 'Introduction to Cyber Security', org: 'CISCO Networking Academy', date: 'Oct 2025', image: 'introduction_to_cyber_security.jpg', plate: 'halftone' },
  { name: 'Introduction to IOT and Digital Transformation', org: 'CISCO Networking Academy', date: 'Oct 2025', image: 'introduction_to_iot.jpg', plate: 'halftone' },
  { name: 'Become a Data Science Expert with Python Django Tutorial', org: 'Simplilearn', date: 'Jan 2025', image: 'Edimar_simplilearn.png', plate: 'halftone' },
];
