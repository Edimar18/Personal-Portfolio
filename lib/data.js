// ---------------------------------------------------------------
// All portfolio content lives here. Edit this file to update your
// site — you should not need to touch the component files for
// ordinary content changes.
// ---------------------------------------------------------------

export const profile = {
  name: 'Edimar Mosquida',
  location: 'Cagayan de Oro City, Philippines',
  phone: '0965 926 8288',
  email: 'mosquida.edimar.18@gmail.com',
  github: 'https://github.com/Edimar18',
  linkedin: 'https://www.linkedin.com/in/edimar-mosquida-a02228347/',
  role: 'BSIT (IoT TRACK) · TOPCIT LEVEL 3 CERTIFIED',
  status: '4th Year BSIT Student · Seeking Internship (Upcoming Semester)',
  statement:
    'Fourth-year Information Technology student (IoT Track) with verified practical ICT competency (TOPCIT Level 3). Experienced in bridging embedded hardware (ESP32/Orange Pi), edge AI computer vision, and robust full-stack/mobile architectures from prototype to field deployment.',
};

export const topcit = {
  title: 'TOPCIT Level 3 Benchmark',
  subtitle: 'Test of Practical Competency in ICT',
  level: 'Level 3',
  score: 414,
  maxScore: 1000,
  percentage: 41.4,
  certificateNo: 'TL2603000603',
  examineeNo: 'TP26031000754',
  testDate: 'July 23, 2026',
  publishedDate: 'September 19, 2026',
  issuer: 'IITP (Institute for Information & Communications Technology Planning & Evaluation)',
  cohortAverage: 286.5,
  top30Benchmark: 512.0,
  questionsCorrect: 54,
  totalQuestions: 75,
  accuracy: '72.0%',
  summary:
    'Standardized practical ICT competency assessment jointly administered by IITP. Level 3 (400+ points) represents the established industry benchmark required for practical competency and serves as the official criterion for additional qualification points in enterprise and industry document screening.',
  domains: [
    {
      code: 'DOM-01',
      name: 'System Architecture & InfoSec',
      score: 130.0,
      maxScore: 235,
      percent: 55.3,
      correct: 16,
      total: 18,
      cohortAvg: 70.7,
      top30: 120.4,
      status: 'Exceeded Top 30% Benchmark',
      highlight: '16/18 Correct (88.9%)',
      description:
        'Demonstrated strong competence in system architecture design, OS resource management, network security protocols, threat mitigation, and infrastructure reliability.',
    },
    {
      code: 'DOM-02',
      name: 'Data Management',
      score: 135.0,
      maxScore: 265,
      percent: 50.9,
      correct: 13,
      total: 19,
      cohortAvg: 88.8,
      top30: 161.1,
      status: '+52% Above Cohort Average',
      highlight: '13/19 Correct (68.4%)',
      description:
        'Proficiency in relational database schema modeling, SQL query design, entity normalization, transaction ACID compliance, and data storage optimization.',
    },
    {
      code: 'DOM-03',
      name: 'Software Development',
      score: 94.0,
      maxScore: 365,
      percent: 25.8,
      correct: 14,
      total: 21,
      cohortAvg: 85.7,
      top30: 156.5,
      status: 'Above Cohort Average',
      highlight: '14/21 Correct (66.7%)',
      description:
        'Practical knowledge of object-oriented programming concepts, algorithmic logic, structured modular design, and full software lifecycle engineering.',
    },
    {
      code: 'DOM-04',
      name: 'IT Business & Management',
      score: 55.0,
      maxScore: 135,
      percent: 40.7,
      correct: 11,
      total: 17,
      cohortAvg: 41.4,
      top30: 74.0,
      status: '+33% Above Cohort Average',
      highlight: '11/17 Correct (64.7%)',
      description:
        'Solid comprehension of technical project management processes, workflow planning, IT ethics, stakeholder requirements, and technology alignment.',
    },
  ],
  documents: [
    {
      title: 'Score Certificate',
      label: 'Official IITP Certificate',
      file: '/topcit_certificate.pdf',
      preview: '/topcit_certificate.png',
      type: 'Official PDF Certificate',
    },
    {
      title: 'Analysis by Area',
      label: 'Domain-by-Domain Diagnostic',
      file: '/topcit_analysis_by_area.pdf',
      preview: '/topcit_analysis_page-1.png',
      type: 'Diagnostic Report',
    },
    {
      title: 'Overall Achievements',
      label: 'Score Distribution & Benchmark',
      file: '/topcit_overall_achievements.pdf',
      preview: '/topcit_overall_page-1.png',
      type: 'Performance Report',
    },
  ],
};

// "plate" controls which placeholder visual-proof pattern renders
// behind each project card: circuit | scanline | wireframe | halftone
export const projects = [
  {
    code: 'P-01',
    name: 'PREVENTA',
    subtitle: 'Residential Fire-Hazard Early Prediction System',
    role: 'Lead IoT & Backend Developer',
    description:
      'A multi-sensor residential fire-hazard prediction system. An ESP32 microcontroller processes real-time environmental telemetry (MQ-7 carbon monoxide and DHT22 temperature/humidity) combined with an ACS712 current sensor to detect electrical anomalies before combustion. A Django backend ingests, computes hazard thresholds, and pushes immediate safety alerts.',
    tech: ['ESP32', 'Django', 'Python', 'MQ-7', 'DHT22', 'ACS712', 'IoT Telemetry'],
    github: 'https://github.com/Edimar18',
    plate: 'circuit',
    image: '/preventa.jpg',
  },
  {
    code: 'P-02',
    name: 'Project I.S.O.R.T.',
    subtitle: 'AI-Powered Edge Vision Waste Classification',
    role: 'AI & Systems Developer',
    description:
      'An autonomous smart-bin sorting system engineered to solve local recycling compliance gaps. Implements an edge-optimized YOLOv8 computer vision model trained via Edge Impulse for high-speed offline inference on an Orange Pi single-board computer, connected to an interactive real-time dashboard.',
    tech: ['YOLOv8', 'Edge Impulse', 'Orange Pi', 'Python', 'Computer Vision', 'Linux'],
    github: 'https://github.com/Edimar18/PROJECT-I-S.O.R.T',
    plate: 'scanline',
    image: '/isort.jpg',
  },
  {
    code: 'P-03',
    name: 'PyCC Chapel Monitoring App',
    subtitle: 'Parish Youth Activity & Coordination Platform',
    role: 'Lead Mobile Developer',
    description:
      'A production mobile app built for the Parish Youth Coordinating Council of Dansolihon Parish. Designed with an offline-first architecture using Flutter and SQLite to guarantee reliable attendance tracking in rural signal dead-zones, with encrypted ZIP archive reports for monthly diocesan audits.',
    tech: ['Flutter', 'Dart', 'SQLite', 'Offline-First', 'Report Automation'],
    github: 'https://github.com/Edimar18',
    plate: 'wireframe',
    image: '/pycc_chapel_monitoring_app.jpg',
  },
  {
    code: 'P-04',
    name: 'Roomoro',
    subtitle: 'Student Accommodation & Boarding House Finder',
    role: 'Mobile Application Developer',
    description:
      'A cross-platform mobile application designed to simplify boarding house and student pad hunting in Cagayan de Oro City. Features real-time Firebase syncing, interactive geolocation filters, verified landlord listings, and in-app direct inquiry channels.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Mobile UX'],
    github: 'https://github.com/Edimar18/Roomoro',
    plate: 'halftone',
    image: '/roomoro.jpg',
  },
];

export const leadership = [
  {
    org: 'ISDA Tignapoloan Association',
    role: 'Chairperson',
    period: '2025 — 2026',
    location: 'Tignapoloan, Cagayan de Oro City',
    summary:
      'Elected Chairperson directing executive governance, community development programs, and scholarship support initiatives for collegiate scholars and local youth.',
    achievements: [
      'Orchestrated annual General Assembly and strategic planning sessions across community stakeholders',
      'Managed scholarship allocations, transparent documentation, and executive committee workflows',
      'Bridged community-focused goals with technical digital records and structured communication channels',
    ],
    skills: ['Executive Leadership', 'Program Governance', 'Stakeholder Management', 'Public Speaking'],
    plate: 'halftone',
    image: '/isda_chairperson.jpg',
  },
  {
    org: 'PYCC — Dansolihon Parish',
    role: 'Youth Leaderhead',
    period: '2023 — Present',
    location: 'Dansolihon, Cagayan de Oro City',
    summary:
      'Executive leaderhead within the Parish Youth Coordinating Council, overseeing youth development, spiritual ministry programs, and technological operational modernization across all constituent chapels.',
    achievements: [
      'Engineered and rolled out a dedicated Flutter mobile application streamlining attendance and monthly audit reports across rural chapels',
      'Organized multi-chapel youth conferences, workshops, and community outreach programs',
      'Mentored incoming youth officers in organizational leadership, event logistics, and technical tools',
    ],
    skills: ['Community Organizing', 'Digital Modernization', 'Team Mentorship', 'Event Logistics'],
    plate: 'halftone',
    image: '/pycc_youth_leaderhead.jpg',
  },
];

export const education = [
  {
    institution: 'University of Science and Technology of Southern Philippines (USTP) — CDO',
    degree: 'Bachelor of Science in Information Technology — IoT Track',
    period: '2023 — 2027 (4th Year, 1st Semester)',
    detail:
      'Specializing in Internet of Things (IoT), Edge AI inference, Embedded Systems, and Full-Stack Systems Architecture. Currently in 4th Year (1st Semester) and actively preparing for the upcoming semester industry internship / On-the-Job Training (OJT).',
    highlights: [
      'TOPCIT Level 3 Certified (Score: 414 / 1000 — significantly surpassing national cohort average)',
      'Lead hardware-software developer on production-grade IoT and edge AI capstone prototypes (PREVENTA & Project I.S.O.R.T.)',
      'Strong academic and practical focus in Embedded Systems, Systems Architecture, Information Security, and Mobile App Engineering',
    ],
  },
];

export const softSkills = [
  { name: 'Technical Problem Solving', note: 'Diagnosing edge-to-cloud anomalies across embedded sensors, network links, and backend APIs.' },
  { name: 'Leadership & Initiative', note: 'Directing cross-functional student teams and community associations under real-world deadlines.' },
  { name: 'Clear Communication', note: 'Translating complex architectural constraints into actionable roadmaps for both engineers and non-technical stakeholders.' },
  { name: 'Engineering Collaboration', note: 'Partnering across hardware fabrication, mobile frontend design, and database schema implementation.' },
  { name: 'Adaptability & Agility', note: 'Rapidly mastering new hardware protocols, AI frameworks (YOLO/Edge Impulse), and mobile platforms.' },
  { name: 'End-to-End Ownership', note: 'Taking systems from zero-state requirements, circuit prototyping, and coding through live deployment.' },
];

export const certificates = [
  {
    name: 'TOPCIT Level 3 — Test of Practical Competency in ICT',
    org: 'IITP (Institute for Information & Communications Technology Planning & Evaluation)',
    date: 'Jul 2026',
    image: '/topcit_certificate.png',
    file: '/topcit_certificate.pdf',
    badge: 'Level 3 Certified · Score: 414',
    plate: 'circuit',
    description: 'Score: 414 / 1000 (Cohort Avg: 286.5). Official benchmark qualification for industry recruitment.',
  },
  {
    name: 'Introduction to Artificial Intelligence, Machine Learning, and Deep Learning',
    org: 'DICT Region X (Department of Information and Communications Technology)',
    date: 'Oct 2025',
    image: '/Certificate-AIML-24.jpg',
    plate: 'halftone',
    description: 'Practical training on ML algorithms, neural networks, computer vision fundamentals, and AI workflows.',
  },
  {
    name: 'Software Development and Design Thinking',
    org: 'DICT Region X',
    date: 'Sep 2025',
    image: '/Certificate-SDDT-50.jpg',
    plate: 'halftone',
    description: 'Agile development methodologies, user-centric problem scoping, and iterative software system design.',
  },
  {
    name: 'Introduction to Cyber Security',
    org: 'CISCO Networking Academy',
    date: 'Oct 2025',
    image: '/introduction_to_cyber_security.jpg',
    plate: 'halftone',
    description: 'Network defense concepts, cryptography basics, vulnerability assessment, and threat mitigation.',
  },
  {
    name: 'Introduction to IoT and Digital Transformation',
    org: 'CISCO Networking Academy',
    date: 'Oct 2025',
    image: '/introduction_to_iot.jpg',
    file: '/Introduction_to_IoT_certificate_mosquida-edimar-18-gmail-com_fe3c3c3c-8d5d-46cf-a3fb-61d69e0fdbf4.pdf',
    plate: 'halftone',
    description: 'IoT network architecture, sensor interfaces, cloud convergence, and industrial digital transformation.',
  },
  {
    name: 'Become a Data Science Expert with Python Django Tutorial',
    org: 'Simplilearn',
    date: 'Jan 2025',
    image: '/Edimar_simplilearn.png',
    plate: 'halftone',
    description: 'Full-stack web application development, Django MVC/MVT architecture, ORM, and RESTful data pipelines.',
  },
];
