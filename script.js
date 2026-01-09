(function () {
  // ===== ENHANCED TYPING EFFECT =====
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const text = typingEl.getAttribute('data-text') || '';
    let i = 0;
    let isDeleting = false;
    let currentText = '';

    function typeWriter() {
      if (isDeleting) {
        currentText = text.substring(0, currentText.length - 1);
      } else {
        currentText = text.substring(0, i + 1);
      }

      typingEl.textContent = currentText;

      let typeSpeed = 100;
      if (isDeleting) typeSpeed /= 2;

      if (!isDeleting && currentText === text) {
        typeSpeed = 2000; // pause at full text
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        i = 0;
        typeSpeed = 500; // pause before restart
      } else if (!isDeleting) {
        i++;
      }

      setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();
  }

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== UPDATE FOOTER YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== PROJECT DATA =====
  const projects = [
    {
      title:
        'Vulnerability Assessment and Penetration Testing on College Student Information System',
      desc:
        'Conducted a vulnerability analysis on the college Student Information System using Burp Suite, Nmap and manual testing.',
      stack: 'Burp Suite · Nmap · Manual vulnerability testing',
      link: 'Confidential',
      category: 'cybersecurity',
      featured: true
    },
    {
      title: 'Secure Chat Application',
      desc:
        'End‑to‑end encrypted web chat application with URL scanning, file sharing and robust authentication.',
      stack: 'Python · cryptography · AES · HTML · CSS · JavaScript',
      link: 'https://github.com/sonikumaramukions/secure_chat_application',
      category: 'cybersecurity',
      featured: true
    },
    {
      title: 'codealpha_network_packet_sniffer',
      desc:
        'Basic network packet sniffer built using Python and Scapy. Captures and displays live network traffic.',
      stack: 'Python · Scapy · Network Analysis',
      link:
        'https://github.com/sonikumaramukions/codealpha_Tasks_network_packet_sniffer',
      category: 'cybersecurity',
      featured: true
    },
    {
      title: 'CodeAlpha – Secure Coding Review (Task 3)',
      desc:
        'Vulnerable Python app converted into a Flask web app to demonstrate issues like SQL Injection in a browser.',
      stack: 'Python · Flask · Manual vulnerability testing',
      link:
        'https://github.com/sonikumaramukions/codealpha_Task_vulnerable_app',
      category: 'cybersecurity',
      featured: true
    },
    {
      title: 'Text Detection in Images using Python',
      desc:
        'Text detection and extraction from images using Tesseract OCR and OpenCV for security investigations.',
      stack: 'Python · OpenCV · Tesseract OCR · Computer Vision',
      link:
        'https://github.com/sonikumaramukions/Text_detection_in_image_using_python',
      category: 'AI/ML',
      featured: true
    },
    {
      title: 'Shopkatha – Lending Management System',
      desc:
        'Web application for shopkeepers to manage customer lending records with Aadhaar verification and history.',
      stack: 'PHP · MySQL · HTML · CSS',
      link:
        'https://github.com/sonikumaramukions/Shopkeeper_management_system-Shopkatha',
      category: 'web',
      featured: false
    },
    {
      title: 'BlockVault – Blockchain Document Storage System',
      desc:
        'Decentralized document management using IPFS for files and Ethereum smart contracts for metadata.',
      stack: 'Solidity · JavaScript · IPFS',
      link: 'https://github.com/sonikumaramukions/IPFS_with_Solidity',
      category: 'blockchain',
      featured: true
    },
    {
      title: 'Speech Recognition and Transcription Tool',
      desc:
        'Python tool to convert live speech to text, useful for security monitoring and audio analysis.',
      stack: 'Python · SpeechRecognition',
      link: 'https://github.com/sonikumaramukions/Speechtotext',
      category: 'web',
      featured: false
    },
    {
      title: 'Student Performance Lookup System',
      desc:
        'Database project with multiple SQL tables and PHP front‑end, demonstrating secure data handling.',
      stack: 'PHP · MySQL · HTML · CSS · XAMPP',
      link:
        'https://github.com/sonikumaramukions/DBMS_PROJECT_STUDENT_PERFORMANCE_LOOKUP_PROJECT',
      category: 'web',
      featured: false
    }
  ];

  // ===== PROJECT FILTERING SYSTEM =====
  function createProjectFilters() {
    const projectSection = document.getElementById('projects');
    const projectGrid = document.getElementById('project-grid');
    if (!projectSection || !projectGrid) return;

    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.innerHTML = `
      <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="cybersecurity">Cybersecurity</button>
        <button class="filter-btn" data-filter="web">Web Development</button>
        <button class="filter-btn" data-filter="ai-ml">AI/ML</button>
        <button class="filter-btn" data-filter="blockchain">Blockchain</button>
      </div>
    `;

    projectSection.insertBefore(filterContainer, projectGrid);

    const filterBtns = filterContainer.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        filterProjects(filter);
      });
    });
  }

  function filterProjects(category) {
    const projectCards = document.querySelectorAll('.card[data-category]');
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      let show = false;

      if (category === 'all') {
        show = true;
      } else if (category === 'ai-ml' && cat === 'AI/ML') {
        show = true;
      } else if (cat === category) {
        show = true;
      }

      if (show) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease-in';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ===== PROJECT RENDERING =====
  function renderProjects() {
    const grid = document.getElementById('project-grid');
    if (!grid) return;

    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.category = p.category;
      card.dataset.featured = String(p.featured);

      const featuredBadge = p.featured
        ? '<span class="featured-badge">⭐ Featured</span>'
        : '';

      card.innerHTML = `
        ${featuredBadge}
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p class="stack">${p.stack}</p>
        <p><a href="${p.link}" target="_blank" rel="noreferrer">GitHub / Demo →</a></p>
      `;

      grid.appendChild(card);
    });
  }

  // ===== SKILL ANIMATIONS =====
  function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    skillCards.forEach(card => observer.observe(card));
  }

  // ===== NAVIGATION HIGHLIGHTING =====
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav .links a');
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // ===== THEME TOGGLE (OPTIONAL) =====
  function initThemeToggle() {
    const nav = document.querySelector('.nav-inner');
    if (!nav) return;

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Toggle theme';

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      themeToggle.innerHTML = document.body.classList.contains('light-theme')
        ? '☀️'
        : '🌙';
    });

    nav.appendChild(themeToggle);
  }

  // ===== CONTACT FORM HANDLING =====
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const subject = String(formData.get('subject') || '').trim();
      const message = String(formData.get('message') || '').trim();

      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Opening email client...';
      submitBtn.disabled = true;

      const emailBody = `Hello Soni Kumar,

You have received a message from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.`;

      const mailtoLink = `mailto:sonikumaroutlook@gmail.com?subject=${encodeURIComponent(
        'Portfolio Contact: ' + subject
      )}&body=${encodeURIComponent(emailBody)}`;

      try {
        window.location.href = mailtoLink;

        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          showNotification(
            'Opening your email client... Please send the email to complete the process.',
            'success'
          );
        }, 500);
      } catch (err) {
        console.error('Error opening mail client', err);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification(
          'Please email me directly at sonikumaroutlook@gmail.com.',
          'info'
        );
      }

      console.log('Contact Form Submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ===== NOTIFICATIONS =====
  function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${
          type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'
        }</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      hideNotification(notification);
    }, 5000);

    notification
      .querySelector('.notification-close')
      .addEventListener('click', () => hideNotification(notification));
  }

  function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }

  // ===== INITIALIZE ALL FEATURES =====
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    createProjectFilters();
    animateSkills();
    highlightActiveSection();
    initContactForm();
    // initThemeToggle(); // enable if you want the theme toggle button
  });

  // ===== ADD CSS ANIMATIONS / UTIL STYLES =====
  const extraStyle = document.createElement('style');
  extraStyle.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .project-filters {
      margin-bottom: 20px;
      text-align: center;
    }

    .filter-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .filter-btn {
      background: var(--panel);
      border: 1px solid var(--line);
      color: var(--fg);
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .filter-btn:hover,
    .filter-btn.active {
      background: var(--glow1);
      color: var(--bg);
      border-color: var(--glow1);
    }

    .featured-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: linear-gradient(90deg, var(--glow1), var(--glow2));
      color: var(--bg);
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .card {
      position: relative;
    }

    .nav .links a.active {
      color: var(--glow1);
      text-decoration: underline;
    }

    .theme-toggle {
      background: none;
      border: 1px solid var(--line);
      color: var(--fg);
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.2rem;
      margin-left: 8px;
    }

    .theme-toggle:hover {
      background: var(--panel);
      border-color: var(--glow1);
    }

    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 350px;
    }

    .notification.show {
      transform: translateX(0);
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .notification-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .notification-message {
      flex: 1;
      color: var(--fg);
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .notification-close {
      background: none;
      border: none;
      color: var(--muted);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s ease;
    }

    .notification-close:hover {
      color: var(--fg);
    }

    .notification-success {
      border-left: 4px solid var(--accent);
    }

    .notification-error {
      border-left: 4px solid #ff5f56;
    }

    .notification-info {
      border-left: 4px solid var(--glow1);
    }

    @media (max-width: 768px) {
      .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100px);
      }

      .notification.show {
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(extraStyle);
})();


