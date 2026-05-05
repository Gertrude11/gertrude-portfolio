/* ============================================
   GERTURDE PORTFOLIO — script.js
   Interactions · Animations · EmailJS Contact
   ============================================ */

/* ======== EMAILJS CONFIG ========
   Steps to activate:
   1. Go to https://www.emailjs.com and create a free account
   2. Create an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template — use these variables:
      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   4. Replace the values below with your actual IDs
   ================================= */
const EMAILJS_PUBLIC_KEY   = "YOUR_PUBLIC_KEY";       // Account > API Keys
const EMAILJS_SERVICE_ID   = "YOUR_SERVICE_ID";       // Email Services tab
const EMAILJS_TEMPLATE_ID  = "YOUR_TEMPLATE_ID";      // Email Templates tab

// ======== INIT EmailJS ========
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ======== CUSTOM CURSOR ========
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .cert-card, .project-card, .exp-card, .skills-tab, input, textarea, select').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform   = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
    follower.style.borderColor = 'var(--mint-deep)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = 'var(--mint)';
  });
});

// ======== NAVBAR SCROLL ========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ======== HAMBURGER MENU ========
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navbar.classList.toggle('mobile-open');
});

// Close on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('mobile-open'));
});

// ======== ACTIVE NAV LINK ========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) {
      current = s.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--mint-deep)'
      : '';
  });
});

// ======== TERMINAL TYPING ANIMATION ========
const lines = [
  'git commit -m "shipped something great"',
  'kubectl apply -f deployment.yaml',
  'python train_model.py --epochs 50',
  'mvn clean install -DskipTests=false',
  'docker build -t myapp:latest .',
  'terraform apply --auto-approve',
  'pytest tests/ --cov=app --cov-report=html',
  'npm run build && deploy --prod',
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const terminalEl = document.getElementById('terminal-text');

function typeEffect() {
  if (!terminalEl) return;
  const current = lines[lineIndex];

  if (!isDeleting) {
    terminalEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2200);
      return;
    }
  } else {
    terminalEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }
  const speed = isDeleting ? 40 : 65;
  setTimeout(typeEffect, speed);
}
typeEffect();

// ======== SCROLL REVEAL ========
const revealEls = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ======== COUNTER ANIMATION ========
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ======== SKILL BARS ANIMATION ========
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
    }
  });
}, { threshold: 0.1 });
skillFills.forEach(fill => skillObserver.observe(fill));

// ======== SKILLS TABS ========
const tabs = document.querySelectorAll('.skills-tab');
const panels = document.querySelectorAll('.skills-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById('tab-' + target);
    if (panel) {
      panel.classList.add('active');
      // Trigger skill bar animation for newly shown panel
      panel.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        }, 80);
      });
    }
  });
});

// ======== CERT CARD HOVER GLOW ========
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', x + '%');
    card.style.setProperty('--glow-y', y + '%');
  });
});

// ======== PROJECT CARD TILT ========
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ======== SMOOTH SCROLL ========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======== CONTACT FORM ========
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText   = document.getElementById('btn-text');
const btnIcon   = document.getElementById('btn-icon');
const feedback  = document.getElementById('form-feedback');

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Validate
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showFeedback('Please fill in all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback('Please enter a valid email address.', 'error');
    return;
  }

  // Loading state
  setLoading(true);

  const templateParams = {
    from_name:  name,
    from_email: email,
    subject:    subject || 'Portfolio Inquiry',
    message:    message,
    reply_to:   email,
  };

  try {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      // Real EmailJS send
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      showFeedback('✓ Message sent! I\'ll be in touch within 24 hours.', 'success');
      form.reset();
    } else {
      // Demo mode — simulate success
      await simulateDelay(1800);
      showFeedback(
        '✓ [DEMO MODE] Message received! Add your EmailJS keys in script.js to go live.',
        'success'
      );
      // Log to console so you can see it works
      console.log('📬 Contact form submission:', templateParams);
      form.reset();
    }
  } catch (err) {
    console.error('EmailJS error:', err);
    showFeedback('✗ Failed to send. Please email directly: alex.morgan@email.com', 'error');
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  if (isLoading) {
    btnText.textContent = 'Sending...';
    btnIcon.textContent = '⟳';
    btnIcon.style.animation = 'spin 1s linear infinite';
  } else {
    btnText.textContent = 'Send Message';
    btnIcon.textContent = '→';
    btnIcon.style.animation = '';
  }
}

function showFeedback(msg, type) {
  feedback.textContent = msg;
  feedback.className = 'form-feedback ' + type;
  setTimeout(() => {
    if (type === 'success') {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }
  }, 6000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simulateDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ======== SPINNER KEYFRAME (injected) ========
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); display: inline-block; }
    to   { transform: rotate(360deg); display: inline-block; }
  }
`;
document.head.appendChild(spinStyle);

// ======== PAGE LOAD ANIMATION ========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ======== SECTION ENTRY HIGHLIGHT ========
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--section-visible', '1');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

// ======== EASTER EGG (Konami Code) ========
let konamiSequence = [];
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', e => {
  konamiSequence.push(e.key);
  konamiSequence = konamiSequence.slice(-10);
  if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
    showFeedback('🎮 You found the easter egg! Real engineers explore everything.', 'success');
    document.querySelector('.hero-name').style.color = 'var(--mint-deep)';
    setTimeout(() => {
      document.querySelector('.hero-name').style.color = '';
    }, 3000);
  }
});

// console.log(`
// %c
//  █████╗ ██╗     ███████╗██╗  ██╗    ███╗   ███╗ ██████╗ ██████╗  ██████╗  █████╗ ███╗   ██╗
// ██╔══██╗██║     ██╔════╝╚██╗██╔╝    ████╗ ████║██╔═══██╗██╔══██╗██╔════╝ ██╔══██╗████╗  ██║
// ███████║██║     █████╗   ╚███╔╝     ██╔████╔██║██║   ██║██████╔╝██║  ███╗███████║██╔██╗ ██║
// ██╔══██║██║     ██╔══╝   ██╔██╗     ██║╚██╔╝██║██║   ██║██╔══██╗██║   ██║██╔══██║██║╚██╗██║
// ██║  ██║███████╗███████╗██╔╝ ██╗    ██║ ╚═╝ ██║╚██████╔╝██║  ██║╚██████╔╝██║  ██║██║ ╚████║
// ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝

// Hey there, fellow engineer! 👋
// Curious enough to open DevTools — I like you.
// If you're interested in working together, head to the Contact section.
// Or try the Konami Code for a surprise: ↑↑↓↓←→←→BA
// `, 'color: #6ECFB1; font-family: monospace; font-size: 9px;');
