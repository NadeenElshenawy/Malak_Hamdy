/**
 * Malak Hamdy - Personal Portfolio Website Script
 * Clean, modern vanilla JavaScript for high performance and smooth interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation & Header Scroll State
  const navbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  // Handle header background on scroll
  const handleScrollHeader = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (window.scrollY > 450) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Scroll to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Menu Toggle
  const openMobileMenu = () => {
    mobileMenuDrawer.classList.remove('translate-x-full');
    mobileMenuBackdrop.classList.remove('hidden');
    setTimeout(() => {
      mobileMenuBackdrop.classList.remove('opacity-0');
      mobileMenuBackdrop.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileMenuDrawer.classList.add('translate-x-full');
    mobileMenuBackdrop.classList.remove('opacity-100');
    mobileMenuBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      mobileMenuBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

  // Close mobile drawer when link clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // 3. Active Nav Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const observeScrollSpy = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-[#5B1363]', 'font-semibold', 'border-b-2', 'border-[#5B1363]');
          link.classList.add('text-[#555555]');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-[#5B1363]', 'font-semibold', 'border-b-2', 'border-[#5B1363]');
            link.classList.remove('text-[#555555]');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', observeScrollSpy, { passive: true });

  // 4. Reveal on Scroll Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Skill Bar Animations
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute('data-percent') || '0%';
        entry.target.style.width = percent;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // 6. Portfolio Projects Filtering & Lightbox Modal
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#5B1363]', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-[#555555]', 'hover:bg-[#F5EEF7]', 'hover:text-[#5B1363]');
      });
      btn.classList.add('bg-[#5B1363]', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-[#555555]', 'hover:bg-[#F5EEF7]', 'hover:text-[#5B1363]');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.98)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });
    });
  });

  // Project Details Lightbox Modal
  const projectModal = document.getElementById('project-modal');
  const projectModalClose = document.getElementById('project-modal-close');
  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const modalImg = document.getElementById('modal-project-img');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalTools = document.getElementById('modal-project-tools');
  const modalRole = document.getElementById('modal-project-role');

  const openProjectModal = (card) => {
    const title = card.getAttribute('data-title');
    const category = card.getAttribute('data-category-name');
    const desc = card.getAttribute('data-desc');
    const imgSrc = card.getAttribute('data-img');
    const tools = card.getAttribute('data-tools');
    const role = card.getAttribute('data-role');

    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalDesc.textContent = desc;
    modalImg.src = imgSrc;
    modalTools.textContent = tools;
    modalRole.textContent = role;

    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);

  // 7. CV Preview / Download Modal
  const cvModal = document.getElementById('cv-modal');
  const openCvBtns = document.querySelectorAll('.open-cv-btn');
  const cvModalClose = document.getElementById('cv-modal-close');
  const cvModalBackdrop = document.getElementById('cv-modal-backdrop');
  const printCvBtn = document.getElementById('print-cv-btn');

  const openCvModal = () => {
    cvModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeCvModal = () => {
    cvModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openCvBtns.forEach(btn => btn.addEventListener('click', openCvModal));
  if (cvModalClose) cvModalClose.addEventListener('click', closeCvModal);
  if (cvModalBackdrop) cvModalBackdrop.addEventListener('click', closeCvModal);

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Text CV Download Handler
  const downloadTextCvBtn = document.getElementById('download-text-cv-btn');
  if (downloadTextCvBtn) {
    downloadTextCvBtn.addEventListener('click', () => {
      const cvText = `MALAK HAMDY - CREATIVE DESIGNER & CONTENT CREATOR
Location: Alexandria, Egypt
Email: hamdymalakhamdy2@gmail.com
WhatsApp: +20 15 58698887
Portfolio: https://malakhamdy.design

--------------------------------------------------
PROFILE SUMMARY
--------------------------------------------------
Creative person interested in design and content creation based in Alexandria, Egypt. 
Passionate about transforming ideas into visual stories, crafting engaging social media graphics, 
and expanding knowledge in graphic design and digital media aesthetics.

--------------------------------------------------
AREAS OF FOCUS & INTERESTS
--------------------------------------------------
• Graphic Design (Layout, visual balance, color theory)
• Social Media Design (Instagram feeds, carousels, story graphics)
• Content Creation (Hooks, visual messaging, media planning)
• Visual Storytelling (Moodboards, brand narratives, editorial aesthetics)
• Creative Ideas & Conceptualization (Brainstorming, creative direction)

--------------------------------------------------
TECHNICAL SKILLS & TOOLS
--------------------------------------------------
• Canva Pro (85% proficiency)
• Basic Graphic Design & Composition (75%)
• Social Media Content Design (80%)
• Creative Thinking & Concept Ideation (90%)
• Content Planning & Editorial Roadmaps (75%)
• Basic Typography & Color Theory (70%)

--------------------------------------------------
LANGUAGES & LOCATION
--------------------------------------------------
• Arabic: Native
• English: Fluent
• Based in: Alexandria, Egypt (Open to Remote & Freelance work worldwide)
`;
      const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Malak_Hamdy_CV.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('CV downloaded successfully!', 'success');
    });
  }

  // 7b. FAQ Accordion Handler
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close all other items
        faqItems.forEach(otherItem => {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherAnswer && otherAnswer !== answer) {
            otherAnswer.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle clicked
        if (isOpen) {
          answer.classList.add('hidden');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 8. Contact Form JavaScript Validation & Feedback
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const messageInput = document.getElementById('user-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    let isValid = true;

    // Name validation
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameError.textContent = 'Please enter your name (at least 2 characters).';
      nameError.classList.remove('hidden');
      nameInput.classList.add('border-red-400', 'focus:ring-red-200');
      nameInput.classList.remove('border-[#ECE8F0]', 'focus:ring-[#5B1363]');
      isValid = false;
    } else {
      nameError.classList.add('hidden');
      nameInput.classList.remove('border-red-400', 'focus:ring-red-200');
      nameInput.classList.add('border-[#ECE8F0]', 'focus:ring-[#5B1363]');
    }

    // Email validation
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please provide a valid email address.';
      emailError.classList.remove('hidden');
      emailInput.classList.add('border-red-400', 'focus:ring-red-200');
      emailInput.classList.remove('border-[#ECE8F0]', 'focus:ring-[#5B1363]');
      isValid = false;
    } else {
      emailError.classList.add('hidden');
      emailInput.classList.remove('border-red-400', 'focus:ring-red-200');
      emailInput.classList.add('border-[#ECE8F0]', 'focus:ring-[#5B1363]');
    }

    // Message validation
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageError.textContent = 'Please write a message with at least 10 characters.';
      messageError.classList.remove('hidden');
      messageInput.classList.add('border-red-400', 'focus:ring-red-200');
      messageInput.classList.remove('border-[#ECE8F0]', 'focus:ring-[#5B1363]');
      isValid = false;
    } else {
      messageError.classList.add('hidden');
      messageInput.classList.remove('border-red-400', 'focus:ring-red-200');
      messageInput.classList.add('border-[#ECE8F0]', 'focus:ring-[#5B1363]');
    }

    return isValid;
  };

  // Real-time input clearing
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      const errorEl = document.getElementById(`${input.id.replace('user-', '')}-error`);
      if (errorEl) errorEl.classList.add('hidden');
      input.classList.remove('border-red-400');
      input.classList.add('border-[#ECE8F0]');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) {
        showToast('Please check the form fields for errors.', 'error');
        return;
      }

      // Simulate sending state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Sending message...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Thank you Malak! Your message has been received.', 'success');
      }, 1200);
    });
  }

  // 9. Click to Copy Helper for Email & Phone
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`, 'success');
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  const fallbackCopy = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied to clipboard: ${text}`, 'success');
  };

  // 10. Reusable Toast Notification System
  const toastContainer = document.getElementById('toast-container');
  window.showToast = (message, type = 'success') => {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    
    toast.className = `flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium transition-all duration-300 pointer-events-auto toast-animate-in ${
      isSuccess 
        ? 'bg-[#5B1363] text-white border border-[#7B1FA2]/40 shadow-purple-900/20' 
        : 'bg-[#842029] text-white border border-red-300'
    }`;

    const iconSvg = isSuccess
      ? `<svg class="w-5 h-5 text-[#DFC1E6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
      : `<svg class="w-5 h-5 text-red-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span class="flex-1">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -10px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3800);
  };

  // Keyboard accessibility for modals (Escape key closes open modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!projectModal.classList.contains('hidden')) closeProjectModal();
      if (!cvModal.classList.contains('hidden')) closeCvModal();
      if (!mobileMenuDrawer.classList.contains('translate-x-full')) closeMobileMenu();
    }
  });
});
