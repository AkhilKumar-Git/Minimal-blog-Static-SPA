// Logic for Sticky Navbar
const navbar = document.querySelector('#NavBar');
let topOffset = navbar.offsetTop;
function stickynavbar() {
  if (window.scrollY >= topOffset) {    
    navbar.classList.add('sticky');
    document.body.style.paddingTop = navbar.offsetHeight + 'px'; // Add top padding to the body
  } else {
    navbar.classList.remove('sticky');
    document.body.style.paddingTop = 0; // Remove top padding from the body
  }
}

window.addEventListener('scroll', stickynavbar);

// JavaScript for toggling the navbar on mobile viewport
function hamburger() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.navbar-links');
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  };
document.addEventListener('DOMContentLoaded', hamburger);
  

// Function to initialize the carousel
function initializeCarousel() {
  const images = document.querySelectorAll('.carousel img');
  let currentImageIdx = 0;

  const showImage = (index) => {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  };

  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  if(prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
      currentImageIdx = currentImageIdx - 1 < 0 ? images.length - 1 : currentImageIdx - 1;
      showImage(currentImageIdx);
    });

    nextButton.addEventListener('click', () => {
      currentImageIdx = (currentImageIdx + 1) % images.length;
      showImage(currentImageIdx);
    });
  }
}

// Call initializeCarousel on DOMContentLoaded for Blog post type 2
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Dynamic loading blog posts content without page refresh for latest posts
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(event) {
    if (event.target.closest('.articles-container .article-link')) {
      event.preventDefault();
      const href = event.target.closest('.article-link').getAttribute('href');
      loadContent(href);
    }
  });
});

// Dynamic loading blog posts content without page refresh for navbar links
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(event) {
    if (event.target.closest('.navbar .nav-link')) {
      event.preventDefault();
      const href = event.target.closest('.nav-link').getAttribute('href');
      loadContent(href);
    }
  });
});

//  Dynamic loading blog posts content without page refresh for Popular posts
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
      if (event.target.closest('.popular-posts .article-link')) {
        event.preventDefault();
        const href = event.target.closest('.article-link').getAttribute('href');
        loadContent(href);
      }
    });
  });
//  Dynamic loading blog posts content without page refresh for featured posts
  document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
      if (event.target.closest('.featured-article')) {
        event.preventDefault();
        const href = event.target.closest('.featured-article').getAttribute('href');
        loadContent(href);
      }
    });
  });


function loadContent(url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('main').innerHTML;
      document.querySelector('main').innerHTML = newContent;
      console.log('Loaded content from:', url);
      initializeCarousel(); // Re-initialize carousel as new content might have been loaded
    })
    .catch(error => {
      console.error('Failed to load content:', error);
    });
}
