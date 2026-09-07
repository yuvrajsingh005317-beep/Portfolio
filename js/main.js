/**
 * Yuvraj Singh - Portfolio Main JavaScript
 * Handles Theme Toggling, Typewriter Effect, Modals, Filters, Form Validation, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemeColor();
  initTypewriter();
  initMobileMenu();
  initScrollSpy();
  initProjectFilters();
  initModals();
  initCVModal();
  initContactForm();
  initCopyActions();
  initBackToTop();
  initLiquidGlassCards();
});

/* ==========================================
   1. THEME MANAGER (DARK / LIGHT MODE)
   ========================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  // Default to dark mode for modern sleek aesthetic if nothing saved
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast(isDark ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

/* ==========================================
   1B. DYNAMIC COLOR PALETTE MANAGER
   ========================================== */
function initThemeColor() {
  const colorBtns = document.querySelectorAll('[data-theme-color]');
  const indicators = document.querySelectorAll('.current-color-indicator');
  const availableThemes = ['cosmic', 'emerald', 'sunset', 'blue', 'magenta'];
  const themeNames = {
    cosmic: 'Cosmic Violet 🟣',
    emerald: 'Matrix Emerald 🟢',
    sunset: 'Sunset Gold 🟠',
    blue: 'Electric Blue 🔵',
    magenta: 'Neon Magenta 🌸'
  };
  const themeGradients = {
    cosmic: 'linear-gradient(to top right, #8b5cf6, #ec4899)',
    emerald: 'linear-gradient(to top right, #10b981, #06b6d4)',
    sunset: 'linear-gradient(to top right, #f59e0b, #f43f5e)',
    blue: 'linear-gradient(to top right, #3b82f6, #06b6d4)',
    magenta: 'linear-gradient(to top right, #ec4899, #8b5cf6)'
  };

  const savedColor = localStorage.getItem('theme-color') || 'cosmic';
  setThemeColor(savedColor, false);

  function setThemeColor(color, notify = true) {
    if (!availableThemes.includes(color)) color = 'cosmic';

    availableThemes.forEach(t => {
      document.documentElement.classList.remove(`theme-${t}`);
    });
    document.documentElement.classList.add(`theme-${color}`);
    localStorage.setItem('theme-color', color);

    // Update active button state
    colorBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-color') === color) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update indicator dots
    indicators.forEach(ind => {
      ind.style.background = themeGradients[color];
    });

    if (notify) {
      showToast(`Theme Color: ${themeNames[color]}`);
    }
  }

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-theme-color');
      setThemeColor(color, true);
    });
  });
}

/* ==========================================
   2. HERO TYPEWRITER EFFECT
   ========================================== */
function initTypewriter() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'B.Tech CSE Student',
    'Cybersecurity Enthusiast',
    'Cloud Computing Explorer',
    'Creator of Intelligent Systems',
    'Full-Stack Developer',
    'Problem Solver & Algorithmic Thinker'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full text
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================
   3. MOBILE NAVIGATION DRAWER
   ========================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    setTimeout(() => mobileBackdrop.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileBackdrop.classList.remove('opacity-100');
    setTimeout(() => {
      mobileBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================
   4. SCROLL SPY & NAVBAR STYLING
   ========================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('main-navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar glass elevation on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('shadow-lg', 'bg-opacity-95');
      } else {
        navbar.classList.remove('shadow-lg', 'bg-opacity-95');
      }
    }

    // Determine current active section
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
   5. PROJECT CATEGORY FILTERS
   ========================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filterBtns.forEach(b => {
        b.classList.remove('dynamic-theme-btn', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white', 'shadow-lg', 'shadow-purple-500/25');
        b.classList.add('glass-card', 'text-slate-300');
      });

      btn.classList.remove('glass-card', 'text-slate-300');
      btn.classList.add('dynamic-theme-btn', 'text-white');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================
   6. MODAL SYSTEM (PROJECTS & CERTIFICATES)
   ========================================== */
const projectData = {
  1: {
    title: "Sound Wave Fire Extinguisher",
    subtitle: "Acoustic Flame Suppression & Combustion Disruption System",
    category: "Hardware & Innovation • Acoustic Engineering",
    tags: ["Acoustic Technology", "Low-Frequency Sound", "Circuit Design", "Sound Amplifier", "Speaker & Power"],
    imageSvg: `<svg class="w-20 h-20 text-rose-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>`,
    overview: "Developed an innovative sound-wave-based fire extinguisher that harnesses controlled low-frequency acoustic sound waves to disrupt flame boundaries and effectively suppress combustion without chemical residue.",
    features: [
      "Engineered low-frequency acoustic wave generation to physically destabilize flame boundaries and suppress active combustion",
      "Designed and implemented an electronic circuit integrating a sound amplifier, speaker, and power supply to generate controlled acoustic waves",
      "Demonstrated an alternative fire-suppression approach that eliminates the need for conventional toxic extinguishing agents",
      "Highlights the transformative potential of acoustic physics and hardware electronics in firefighting and safety engineering"
    ],
    demoLink: "https://github.com/yuvrajsingh005317-beep",
    codeLink: "https://github.com/yuvrajsingh005317-beep"
  },
  2: {
    title: "Hospital Management System",
    subtitle: "Healthcare Resource Management & Operations Platform",
    category: "Software & Web • Database Architecture",
    tags: ["JavaScript", "Python", "MySQL", "Relational Database", "Resource Coordination"],
    imageSvg: `<svg class="w-20 h-20 text-cyan-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
    overview: "A robust, digitalized hospital management system designed using JavaScript and Python to streamline hospital resource allocation, patient care workflows, and medical data administration.",
    features: [
      "Digitalized hospital resource management, slashing manual administrative workload by 40%",
      "Transformed management interface to allow effortless real-time coordination of rooms, employees, drivers, and customers",
      "Boosted overall operational efficiency by 50% with an intuitive, compliant, and user-friendly UX architecture",
      "Integrated a MySQL database for structured data storage and rapid retrieval, ensuring data integrity and reducing retrieval times by 30%"
    ],
    demoLink: "https://github.com/yuvrajsingh005317-beep",
    codeLink: "https://github.com/yuvrajsingh005317-beep"
  }
};

const certificateData = {
  1: {
    title: "Introduction to Cloud Computing",
    issuer: "Infosys Springboard",
    date: "March 25, 2026",
    id: "INFOSYS-CLOUD-COMP",
    img: "assets/cert-infosys-cloud.png",
    downloadName: "Yuvraj_Singh_Infosys_Cloud_Certificate.png",
    verifyUrl: "https://verify.onwingspan.com",
    skills: ["Cloud Architecture", "IaaS / PaaS / SaaS", "Virtualization", "Cloud Security", "Enterprise Deployment"],
    description: "Official course completion certificate awarded to Yuvraj Singh through Infosys Springboard, validating essential cloud computing principles, virtualization frameworks, multi-tenant architectures, cloud storage strategies, and enterprise cloud security fundamentals."
  },
  2: {
    title: "CS205: Building with Artificial Intelligence",
    issuer: "Saylor Academy",
    date: "February 7, 2026",
    id: "2006311129YS",
    img: "assets/cert-saylor-ai.png",
    downloadName: "Yuvraj_Singh_Saylor_AI_Certificate.png",
    verifyUrl: "https://learn.saylor.org/",
    skills: ["Artificial Intelligence", "Intelligent Systems", "Machine Learning Concepts", "AI Software Design", "Practical AI Solutions"],
    description: "Accredited certificate of achievement from Saylor Academy validating 48 hours of coursework with an 88.24% distinction grade, covering artificial intelligence principles, intelligent agent architectures, foundational machine learning concepts, and engineering practical AI software systems."
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('details-modal');
  const modalContainer = document.getElementById('modal-container');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalContentArea = document.getElementById('modal-content-area');

  if (!modalBackdrop || !modalContentArea) return;

  function closeModal() {
    modalBackdrop.classList.remove('active');
    setTimeout(() => {
      modalBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  function openModal() {
    modalBackdrop.classList.remove('hidden');
    setTimeout(() => {
      modalBackdrop.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  // Open Project Modal
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      const project = projectData[id];
      if (!project) return;

      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 inline-block mb-4">
            ${project.imageSvg}
          </div>
          <span class="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-900/40 px-3 py-1 rounded-full">
            ${project.category}
          </span>
          <h3 class="text-2xl md:text-3xl font-bold mt-3 text-slate-900 dark:text-white heading-font">
            ${project.title}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${project.subtitle}</p>
        </div>

        <div class="space-y-5 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          <div>
            <h4 class="font-semibold text-slate-900 dark:text-white text-base mb-2">📌 Overview</h4>
            <p>${project.overview}</p>
          </div>

          <div>
            <h4 class="font-semibold text-slate-900 dark:text-white text-base mb-2">⚡ Key Features & Highlights</h4>
            <ul class="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
              ${project.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-slate-900 dark:text-white text-base mb-2">🛠️ Built With</h4>
            <div class="flex flex-wrap gap-2">
              ${project.tags.map(t => `<span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3">
          <a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View Code
          </a>
          <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-400 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2">
            <span>Live Preview</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      `;
      openModal();
    });
  });

  // Open Certificate Modal
  document.querySelectorAll('.open-cert-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-cert-id');
      const cert = certificateData[id];
      if (!cert) return;

      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <div class="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-900/30 px-3 py-1 rounded-full">
            Verified Credential
          </span>
          <h3 class="text-2xl font-bold mt-3 text-slate-900 dark:text-white heading-font">
            ${cert.title}
          </h3>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">${cert.issuer} • Issued ${cert.date}</p>
          <div class="mt-2 text-xs font-mono text-slate-400">Credential ID: <span class="text-blue-500 font-semibold">${cert.id}</span></div>
        </div>

        <div class="space-y-4 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          <!-- Document Preview Image -->
          <div class="my-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white p-2 shadow-2xl">
            <img src="${cert.img}" alt="${cert.title} Certificate" class="w-full h-auto rounded-xl object-contain shadow-inner">
          </div>

          <div>
            <h4 class="font-semibold text-slate-900 dark:text-white text-base mb-1">📜 Certification Overview</h4>
            <p>${cert.description}</p>
          </div>

          <div>
            <h4 class="font-semibold text-slate-900 dark:text-white text-base mb-2">🎯 Competencies & Skills Verified</h4>
            <div class="flex flex-wrap gap-2">
              ${cert.skills.map(s => `<span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button type="button" class="close-modal-trigger px-4 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Close
          </button>
          <a href="${cert.img}" download="${cert.downloadName}" class="px-4 py-2 text-sm font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <span>Download</span>
          </a>
          <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-400 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2">
            <span>Verify Online</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      `;

      // Attach close listener inside dynamically rendered content
      modalContentArea.querySelector('.close-modal-trigger').addEventListener('click', closeModal);
      openModal();
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================
   6B. CURRICULUM VITAE (CV) PREVIEW MODAL
   ========================================== */
function initCVModal() {
  const cvModal = document.getElementById('cv-modal');
  const closeCVModalBtn = document.getElementById('close-cv-modal-btn');
  const openCVModalBtns = document.querySelectorAll('.open-cv-modal');
  const printCVBtn = document.getElementById('print-cv-btn');

  if (!cvModal) return;

  function openCV() {
    cvModal.classList.remove('hidden');
    setTimeout(() => {
      cvModal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeCV() {
    cvModal.classList.remove('active');
    setTimeout(() => {
      cvModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  openCVModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCV();
    });
  });

  if (closeCVModalBtn) closeCVModalBtn.addEventListener('click', closeCV);

  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) closeCV();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cvModal.classList.contains('hidden')) {
      closeCV();
    }
  });

  if (printCVBtn) {
    printCVBtn.addEventListener('click', () => {
      const printWin = window.open('assets/yuvraj-cv.png', '_blank');
      if (printWin) {
        printWin.addEventListener('load', () => {
          printWin.focus();
          printWin.print();
        });
      }
    });
  }
}

/* ==========================================
   7. CONTACT FORM VALIDATION & SUBMISSION
   ========================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      showToast('Please enter your name.', 'error');
      nameInput.focus();
      return;
    }

    if (!validateEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    if (!subject) {
      showToast('Please enter a subject.', 'error');
      subjectInput.focus();
      return;
    }

    if (message.length < 10) {
      showToast('Message must be at least 10 characters long.', 'error');
      messageInput.focus();
      return;
    }

    // Simulate sending state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      contactForm.reset();
      showToast(`Thank you, ${name}! Your message has been sent successfully. Yuvraj will be in touch soon. 🚀`, 'success');
    }, 1200);
  });
}

/* ==========================================
   8. COPY TO CLIPBOARD ACTIONS
   ========================================== */
function initCopyActions() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'yuvrajsingh180506@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard! 📋', 'success');
      }).catch(() => {
        showToast('Failed to copy. Email: ' + email);
      });
    });
  });
}

/* ==========================================
   9. BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   10. TOAST NOTIFICATION SYSTEM
   ========================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = `
    <div class="w-7 h-7 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    </div>
  `;

  if (type === 'success') {
    icon = `
      <div class="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>
    `;
  } else if (type === 'error') {
    icon = `
      <div class="w-7 h-7 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </div>
    `;
  }

  toast.innerHTML = `
    ${icon}
    <div class="text-xs md:text-sm font-medium text-slate-800 dark:text-slate-100">${message}</div>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove toast after 4s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ==========================================
   11. INTERACTIVE LIQUID GLASS SPECULAR HIGHLIGHT
   ========================================== */
function initLiquidGlassCards() {
  const cards = document.querySelectorAll('.glass-card, .hero-3d-card, .modal-content');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}
