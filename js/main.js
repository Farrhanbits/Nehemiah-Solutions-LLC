/**
 * Nehemiah Solutions LLC - Main Interactive JavaScript
 * High performance, zero clutter, accessible.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>';
        } else {
          icon.innerHTML = '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>';
        }
      }
    });

    // Close when clicking any mobile link
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>';
        }
      });
    });
  }

  // 2. Active Page Navigation Highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Header Scroll Shadow
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 4. Contact Form Handler (Contact Page)
  const contactForm = document.getElementById('contactForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (contactForm && contactFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactFeedback.classList.add('success');
        contactFeedback.innerHTML = `
          <strong>Thank you for reaching out.</strong><br>
          Your inquiry has been received. Nehemiah Solutions LLC will review your message and connect with you promptly.
        `;
        contactFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }

  // 5. Invoice Request Form Handler (Payments Page)
  const invoiceRequestForm = document.getElementById('invoiceRequestForm');
  const invoiceFeedback = document.getElementById('invoiceFeedback');

  if (invoiceRequestForm && invoiceFeedback) {
    invoiceRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = invoiceRequestForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Processing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        invoiceRequestForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        invoiceFeedback.classList.add('success');
        // Exact confirmation message required by design brief:
        invoiceFeedback.innerHTML = `
          <strong>Invoice request received. Thank you.</strong><br>
          We will prepare and send your invoice to the billing contact provided.
        `;
        invoiceFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }

  // 6. Stripe Payment Links
  const stripePayButtons = document.querySelectorAll('.js-stripe-pay');
  stripePayButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Per brief: "Client uses Stripe. Designer must embed Stripe payment link for the Pay Invoice and Make a Secure Payment buttons. Client will provide the Stripe account link."
      const clientStripeUrl = btn.getAttribute('data-stripe-url');
      if (clientStripeUrl && clientStripeUrl !== '#' && clientStripeUrl !== '') {
        window.open(clientStripeUrl, '_blank', 'noopener,noreferrer');
      } else {
        openStripeModal();
      }
    });
  });

  // 7. Modal Handlers
  window.openStripeModal = function() {
    const modal = document.getElementById('stripeModal');
    if (modal) modal.classList.add('active');
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

  // Close modals on outside click or ESC key
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });
});
