// Sound Effects and Enhanced Interactions System
class SoundSystem {
  constructor() {
    this.enabled = true;
    this.audioContext = null;
    this.sounds = {};
    this.initialized = false;
    this.init();
  }

  init() {
    try {
      // Create audio context
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.initialized = true;
      
      // Create sound effects
      this.createSounds();
      
      // Create sound toggle button
      this.createSoundToggle();
      
      console.log('Sound system initialized');
    } catch (error) {
      console.warn('Sound system not available:', error);
      this.initialized = false;
    }
  }

  createSounds() {
    if (!this.initialized) return;

    // Click sound
    this.sounds.click = this.createClickSound();
    
    // Success sound
    this.sounds.success = this.createSuccessSound();
    
    // Error sound
    this.sounds.error = this.createErrorSound();
    
    // Hover sound
    this.sounds.hover = this.createHoverSound();
    
    // Notification sound
    this.sounds.notification = this.createNotificationSound();
    
    // Transition sound
    this.sounds.transition = this.createTransitionSound();
  }

  createClickSound() {
    return () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.1);
    };
  }

  createSuccessSound() {
    return () => {
      const notes = [523.25, 659.25, 783.99]; // C, E, G
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          
          oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
          
          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + 0.3);
        }, index * 100);
      });
    };
  }

  createErrorSound() {
    return () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    };
  }

  createHoverSound() {
    return () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.05);
    };
  }

  createNotificationSound() {
    return () => {
      const notes = [440, 554.37, 659.25]; // A, C#, E
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          
          oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
          
          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + 0.2);
        }, index * 50);
      });
    };
  }

  createTransitionSound() {
    return () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.15);
    };
  }

  createSoundToggle() {
    const toggle = document.createElement('div');
    toggle.className = 'sound-toggle';
    toggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
    `;
    
    toggle.addEventListener('click', () => this.toggle());
    document.body.appendChild(toggle);
    
    this.soundToggle = toggle;
  }

  toggle() {
    this.enabled = !this.enabled;
    this.soundToggle.classList.toggle('muted', !this.enabled);
    
    // Update icon
    if (this.enabled) {
      this.soundToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      `;
    } else {
      this.soundToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      `;
    }
    
    // Play toggle sound
    if (this.initialized) {
      this.sounds.transition();
    }
    
    // Add wave animation
    this.addWaveAnimation(this.soundToggle);
  }

  play(soundName) {
    if (!this.enabled || !this.initialized || !this.sounds[soundName]) return;
    
    try {
      this.sounds[soundName]();
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  addWaveAnimation(element) {
    const wave = document.createElement('div');
    wave.className = 'sound-wave';
    element.appendChild(wave);
    
    setTimeout(() => {
      wave.classList.add('active');
    }, 10);
    
    setTimeout(() => {
      wave.remove();
    }, 600);
  }
}

// Enhanced Interaction System
class InteractionSystem {
  constructor(soundSystem) {
    this.soundSystem = soundSystem;
    this.init();
  }

  init() {
    this.enhanceButtons();
    this.enhanceInputs();
    this.enhanceSections();
    this.addClickEffects();
    this.addKeyboardShortcuts();
    this.enhanceLoading();
  }

  enhanceButtons() {
    document.querySelectorAll('button').forEach(button => {
      // Add hover sound
      button.addEventListener('mouseenter', () => {
        this.soundSystem.play('hover');
        button.classList.add('hover-lift');
      });
      
      button.addEventListener('mouseleave', () => {
        button.classList.remove('hover-lift');
      });
      
      // Add click sound and animation
      button.addEventListener('click', (e) => {
        this.soundSystem.play('click');
        this.addClickFeedback(e);
        button.classList.add('animate-pulse');
        setTimeout(() => button.classList.remove('animate-pulse'), 600);
      });
      
      // Add ripple effect
      button.classList.add('ripple');
      this.addRippleEffect(button);
    });
  }

  enhanceInputs() {
    document.querySelectorAll('input, select, textarea').forEach(input => {
      // Focus sound
      input.addEventListener('focus', () => {
        this.soundSystem.play('hover');
        input.classList.add('animate-glow');
      });
      
      input.addEventListener('blur', () => {
        input.classList.remove('animate-glow');
      });
      
      // Typing sound effect (subtle)
      let typingTimer;
      input.addEventListener('input', () => {
        clearTimeout(typingTimer);
        input.classList.add('typing-indicator-active');
        typingTimer = setTimeout(() => {
          input.classList.remove('typing-indicator-active');
        }, 500);
      });
    });
  }

  enhanceSections() {
    document.querySelectorAll('[id*="section"] .header').forEach(header => {
      // Add magnetic effect
      header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        header.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      header.addEventListener('mouseleave', () => {
        header.style.transform = '';
      });
    });
  }

  addClickEffects() {
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        this.createClickEffect(e.clientX, e.clientY);
      }
    });
  }

  createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-feedback';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 500);
  }

  addClickFeedback(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  addRippleEffect(element) {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  }

  addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter to convert
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const convertBtn = document.getElementById('package-button');
        if (convertBtn && !convertBtn.disabled) {
          convertBtn.click();
        }
      }
      
      // Escape to close modals
      if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-coverage:not(.modal-coverage-hidden)');
        if (modal) {
          modal.classList.add('modal-coverage-hidden');
          this.soundSystem.play('transition');
        }
      }
      
      // Space to expand/collapse sections when focused
      if (e.key === ' ' && e.target.classList.contains('header')) {
        e.preventDefault();
        e.target.click();
      }
    });
  }

  enhanceLoading() {
    const originalShowSpinner = window.showSpinner;
    if (originalShowSpinner) {
      window.showSpinner = function() {
        originalShowSpinner();
        // Add enhanced loading animation
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
          spinner.classList.add('animate-glow');
        }
      };
    }
  }

  showSuccess(message) {
    this.soundSystem.play('success');
    this.showNotification(message, 'success');
    this.createCelebration();
  }

  showError(message) {
    this.soundSystem.play('error');
    this.showNotification(message, 'error');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        ${message}
      </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--surface);
      border: 2px solid var(--${type});
      border-radius: var(--border-radius);
      padding: var(--spacing-md);
      z-index: 10000;
      max-width: 300px;
      box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('hide');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Play notification sound
    this.soundSystem.play('notification');
  }

  createCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle';
      celebration.appendChild(particle);
    }
    
    document.body.appendChild(celebration);
    
    setTimeout(() => celebration.remove(), 2000);
  }
}

// Initialize systems when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const soundSystem = new SoundSystem();
  const interactionSystem = new InteractionSystem(soundSystem);
  
  // Make systems globally available
  window.soundSystem = soundSystem;
  window.interactionSystem = interactionSystem;
  
  // Enhanced packaging completion
  const originalSignalPackagingComplete = window.signalPackagingComplete;
  window.signalPackagingComplete = function(success, message) {
    if (success) {
      window.interactionSystem.showSuccess('Conversion completed successfully!');
    } else {
      window.interactionSystem.showError('Conversion failed: ' + message);
    }
    
    if (originalSignalPackagingComplete) {
      originalSignalPackagingComplete(success, message);
    }
  };
});