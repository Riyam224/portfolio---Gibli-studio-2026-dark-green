// Smooth scrolling and navbar interactions
const navLinks = document.querySelectorAll(".nav-links a:not(.theme-btn)");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section[id]");
const scrollIndicator = document.querySelector(".scroll-indicator");

// Enhanced smooth scroll to sections
function smoothScrollToSection(targetId) {
   const target = document.getElementById(targetId);
   if (target) {
      // Calculate offset accounting for navbar height
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navbarHeight - 20;

      // Smooth scroll with easing
      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth",
      });

      // Update URL hash without jumping
      history.pushState(null, null, `#${targetId}`);
   }
}

navLinks.forEach(link => {
   link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
         e.preventDefault();
         const targetId = href.substring(1);
         smoothScrollToSection(targetId);
      }
   });
});

// Handle all anchor links on the page (including hero CTA)
document.querySelectorAll('a[href^="#"]').forEach(link => {
   link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#") && href !== "#") {
         e.preventDefault();
         const targetId = href.substring(1);
         smoothScrollToSection(targetId);
      }
   });
});

// Navbar scroll effect and active section tracking
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavigation() {
   const currentScrollY = window.scrollY;
   const navbarHeight = navbar.offsetHeight;

   // Add scrolled class to navbar
   if (currentScrollY > 100) {
      navbar.classList.add("scrolled");
   } else {
      navbar.classList.remove("scrolled");
   }

   // Show/hide scroll indicator based on scroll position
   if (scrollIndicator) {
      const projectsSection = document.getElementById("projects");

      if (projectsSection) {
         const projectsTop = projectsSection.offsetTop;

         // Show indicator only when in hero section and not at the very top
         if (currentScrollY > 150 && currentScrollY < projectsTop - 200) {
            scrollIndicator.classList.add("visible");
         } else {
            scrollIndicator.classList.remove("visible");
         }
      }
   }

   // Track active section with improved detection
   let current = "";
   const scrollPosition = currentScrollY + navbarHeight + 100;

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
         current = section.getAttribute("id");
      }
   });

   // Update active nav link
   navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
         link.classList.add("active");
      }
   });

   lastScrollY = currentScrollY;
   ticking = false;
}

window.addEventListener("scroll", () => {
   if (!ticking) {
      window.requestAnimationFrame(() => {
         updateNavigation();
      });
      ticking = true;
   }
}, { passive: true });

// Initial call to set active state on page load
updateNavigation();

// Add click handler for scroll indicator
if (scrollIndicator) {
   scrollIndicator.addEventListener("click", () => {
      smoothScrollToSection("projects");
   });
}
