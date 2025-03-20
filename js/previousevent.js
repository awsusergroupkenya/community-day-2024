// Previous Events JavaScript for AWS2024 Section
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the first drawer as active by default
  toggleDrawer('speakers-drawer', true);
  
  // Initialize carousels
  initCarousel();
  initBoothCarousel();
  
  // Add click handler to each drawer preview area
  const previewAreas = document.querySelectorAll('.drawer-preview');
  
  previewAreas.forEach(preview => {
    preview.addEventListener('click', function() {
      // Find the parent drawer
      const drawer = this.closest('.drawer');
      if (drawer) {
        // Get the drawer id
        const drawerId = drawer.id;
        // Toggle the drawer
        toggleDrawer(drawerId);
      }
    });
  });
  
  // Add hover effect to drawer headers
  const drawerHeaders = document.querySelectorAll('.drawer-header');
  
  drawerHeaders.forEach(header => {
    header.addEventListener('mouseenter', function() {
      this.querySelector('.drawer-toggle').style.background = 'rgba(255, 153, 0, 0.4)';
    });
    
    header.addEventListener('mouseleave', function() {
      if (!this.closest('.drawer').classList.contains('active')) {
        this.querySelector('.drawer-toggle').style.background = 'rgba(255, 153, 0, 0.2)';
      }
    });
  });
});

// Toggle drawer function
function toggleDrawer(drawerId, forceOpen = false) {
  // Get all drawers
  const allDrawers = document.querySelectorAll('.drawer');
  
  // Get the clicked drawer
  const targetDrawer = document.getElementById(drawerId);
  
  // If we're forcing open or the drawer isn't already active
  if (forceOpen || !targetDrawer.classList.contains('active')) {
    // Close all drawers
    allDrawers.forEach(drawer => {
      drawer.classList.remove('active');
    });
    
    // Open the target drawer
    targetDrawer.classList.add('active');
    
    // Scroll to the drawer if on mobile
    if (window.innerWidth < 992) {
      setTimeout(() => {
        targetDrawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  } else {
    // If the drawer is already active, just toggle it
    targetDrawer.classList.toggle('active');
  }
}

// Activities Carousel functionality
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextButton = document.querySelector('.carousel-next');
  const prevButton = document.querySelector('.carousel-prev');
  
  if (!track || !slides.length || !nextButton || !prevButton) return;
  
  let currentIndex = 0;
  
  // Set initial position
  updateCarousel();
  
  // Next button click
  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to the first slide
    }
    updateCarousel();
  });
  
  // Previous button click
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1; // Loop to the last slide
    }
    updateCarousel();
  });
  
  // Function to update carousel position
  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  
  // Update on window resize
  window.addEventListener('resize', updateCarousel);
  
  // Auto-advance carousel every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);
}

// Booth Carousel functionality
function initBoothCarousel() {
  const track = document.querySelector('.booth-carousel-track');
  const slides = document.querySelectorAll('.booth-carousel-slide');
  const nextButton = document.querySelector('.booth-carousel-next');
  const prevButton = document.querySelector('.booth-carousel-prev');
  
  if (!track || !slides.length || !nextButton || !prevButton) return;
  
  let currentIndex = 0;
  
  // Set initial position
  updateBoothCarousel();
  
  // Next button click
  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to the first slide
    }
    updateBoothCarousel();
  });
  
  // Previous button click
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1; // Loop to the last slide
    }
    updateBoothCarousel();
  });
  
  // Function to update booth carousel position
  function updateBoothCarousel() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  
  // Update on window resize
  window.addEventListener('resize', updateBoothCarousel);
  
  // Auto-advance carousel every 6 seconds (slightly offset from the activities carousel)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateBoothCarousel();
  }, 6000);
}

// Add event to recalculate drawer heights when window is resized
window.addEventListener('resize', function() {
  const activeDrawers = document.querySelectorAll('.drawer.active');
  activeDrawers.forEach(drawer => {
    // This forces a recalculation of max-height
    drawer.classList.remove('active');
    setTimeout(() => {
      drawer.classList.add('active');
    }, 10);
  });
});