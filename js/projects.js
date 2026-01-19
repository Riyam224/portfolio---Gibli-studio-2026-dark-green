// ========== PROJECTS SHOWCASE ==========

// Get icon for category
function getCategoryIcon(category) {
   const icons = {
      'Mobile Development': '📱',
      'Full-Stack Development': '💻',
      'Mobile & AI': '🤖',
      'Web Application': '🌐',
      'IoT & Web': '🔌',
      'Data Analytics': '📊'
   };
   return icons[category] || '💼';
}

// Create project card HTML
function createProjectCard(project) {
   const icon = getCategoryIcon(project.category);

   // Check if project has video or GIF demo
   const hasVideo = project.videoDemo;
   const hasGif = project.gifDemo;
   const coverImage = project.coverImage || project.image;

   return `
      <article class="project-card glass-card" data-project-id="${project.id}" data-category="${project.category.toLowerCase()}" data-has-video="${hasVideo ? 'true' : 'false'}" data-has-gif="${hasGif ? 'true' : 'false'}">
         <div class="project-glow"></div>

         <div class="project-image-container" style="position: relative; overflow: hidden;">
            ${hasVideo ? `
               <img src="${coverImage}" alt="${project.title}" class="project-image project-cover" style="transition: opacity 0.3s;">
               <video class="project-video-preview"
                      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; pointer-events: none; background: transparent;"
                      muted
                      loop
                      preload="none">
                  <source src="${project.videoDemo}" type="video/mp4">
               </video>
            ` : hasGif ? `
               <img src="${coverImage}" alt="${project.title}" class="project-image project-cover" style="transition: opacity 0.3s;">
               <img src="${project.gifDemo}" alt="${project.title} Demo" class="project-gif-preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; pointer-events: none;">
            ` : project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
            <div class="project-placeholder" style="${project.image ? 'display: none;' : ''}">${icon}</div>
         </div>

         <div class="project-content">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p class="project-description">${project.shortDesc}</p>

            <div class="project-tags">
               ${project.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
               ${project.tags.length > 3 ? `<span class="tag">+${project.tags.length - 3} more</span>` : ''}
            </div>

            <div class="project-meta">
               <span class="project-year">${project.year}</span>
               <span class="project-link">View Details →</span>
            </div>
         </div>

         <div class="project-hover-indicator">→</div>
      </article>
   `;
}

// Render all projects
function renderProjects(filter = 'all') {
   const container = document.getElementById('projects-container');

   let filteredProjects = projectsData;

   if (filter !== 'all') {
      filteredProjects = projectsData.filter(project => {
         const category = project.category.toLowerCase();
         if (filter === 'mobile') {
            return category.includes('mobile');
         } else if (filter === 'web') {
            return category.includes('web');
         } else if (filter === 'fullstack') {
            return category.includes('full-stack');
         }
         return true;
      });
   }

   container.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');

   // Add click handlers to project cards
   document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
         const projectId = parseInt(card.dataset.projectId);
         openProjectModal(projectId);
      });

      // Add hover video functionality for cards with videos
      if (card.dataset.hasVideo === 'true') {
         const videoPreview = card.querySelector('.project-video-preview');
         const coverImage = card.querySelector('.project-cover');

         if (videoPreview && coverImage) {
            card.addEventListener('mouseenter', () => {
               // Load and play video
               if (videoPreview.readyState === 0) {
                  videoPreview.load();
               }
               videoPreview.play().catch(err => console.log('Video play failed:', err));

               // Fade out cover, fade in video
               coverImage.style.opacity = '0';
               videoPreview.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
               // Pause video and reset
               videoPreview.pause();
               videoPreview.currentTime = 0;

               // Fade in cover, fade out video
               coverImage.style.opacity = '1';
               videoPreview.style.opacity = '0';
            });
         }
      }

      // Add hover GIF functionality for cards with GIFs
      if (card.dataset.hasGif === 'true') {
         const gifPreview = card.querySelector('.project-gif-preview');
         const coverImage = card.querySelector('.project-cover');

         if (gifPreview && coverImage) {
            card.addEventListener('mouseenter', () => {
               // Fade out cover, fade in GIF
               coverImage.style.opacity = '0';
               gifPreview.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
               // Fade in cover, fade out GIF
               coverImage.style.opacity = '1';
               gifPreview.style.opacity = '0';
            });
         }
      }
   });
}

// Filter functionality
function setupFilters() {
   const filterButtons = document.querySelectorAll('.filter-btn');

   filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
         // Update active state
         filterButtons.forEach(b => b.classList.remove('active'));
         btn.classList.add('active');

         // Filter projects
         const filter = btn.dataset.filter;
         renderProjects(filter);
      });
   });
}

let activeProject = null;

function renderModalMedia(project, autoplay = false) {
   const modalImageContainer = document.querySelector('.modal-image-container');
   const imageElement = document.getElementById('modal-image');
   const icon = getCategoryIcon(project.category);

   if (project.videoDemo) {
      modalImageContainer.innerHTML = `
         <div class="video-player-container" style="position: relative; width: 100%; height: 100%; background: #000;">
            <img src="${project.coverImage || project.image}"
                 alt="${project.title}"
                 class="video-cover"
                 style="width: 100%; height: 100%; object-fit: contain; cursor: pointer; transition: opacity 0.3s;">
            <div class="play-button-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); cursor: pointer; pointer-events: none;">
               <svg width="80" height="80" viewBox="0 0 80 80" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));">
                  <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.9)" />
                  <polygon points="32,24 32,56 56,40" fill="#333" />
               </svg>
            </div>
            <video class="project-video"
                   style="width: 100%; height: 100%; object-fit: contain; display: none;"
                   controls>
               <source src="${project.videoDemo}" type="video/mp4">
               Your browser does not support the video tag.
            </video>
         </div>
      `;

      const videoCover = modalImageContainer.querySelector('.video-cover');
      const playButton = modalImageContainer.querySelector('.play-button-overlay');
      const videoElement = modalImageContainer.querySelector('.project-video');

      const playVideo = () => {
         videoCover.style.display = 'none';
         playButton.style.display = 'none';
         videoElement.style.display = 'block';
         videoElement.play().catch(() => {});
      };

      videoCover.addEventListener('click', playVideo);
      playButton.addEventListener('click', playVideo);

      videoElement.addEventListener('ended', () => {
         videoCover.style.display = 'block';
         playButton.style.display = 'block';
         videoElement.style.display = 'none';
      });

      if (autoplay) {
         playVideo();
      }
      return;
   }

   if (project.gifDemo) {
      modalImageContainer.innerHTML = `
         <div style="width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center;">
            <img src="${project.gifDemo}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: contain;">
         </div>
      `;
      return;
   }

   if (!imageElement) {
      modalImageContainer.innerHTML = '<img id="modal-image" src="" alt="" class="modal-image">';
   }

   const refreshedImage = document.getElementById('modal-image');
   refreshedImage.src = project.image;
   refreshedImage.alt = project.title;
   refreshedImage.style.display = 'block';

   refreshedImage.onerror = function() {
      this.style.display = 'none';
      modalImageContainer.innerHTML = `<div class="project-placeholder" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 5rem;">${icon}</div>`;
   };
}

// Open project modal
function openProjectModal(projectId) {
   const project = projectsData.find(p => p.id === projectId);
   if (!project) return;

   activeProject = project;
   const modal = document.getElementById('project-modal');

   renderModalMedia(project);

   document.getElementById('modal-category').textContent = project.category;
   document.getElementById('modal-title').textContent = project.title;
   document.getElementById('modal-full-desc').textContent = project.fullDesc;
   document.getElementById('modal-role').textContent = project.role;
   document.getElementById('modal-year').textContent = project.year;

   // Features
   const featuresList = document.getElementById('modal-features');
   featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');

   // Tags
   const tagsContainer = document.getElementById('modal-tags');
   tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

   // Links
   const demoBtn = document.getElementById('modal-demo');
   const githubBtn = document.getElementById('modal-github');

   demoBtn.href = project.demoUrl;
   githubBtn.href = project.githubUrl;

   // If demoUrl is a GIF/image, update button text
   if (project.demoUrl.match(/\.(gif|jpg|jpeg|png)$/i)) {
      demoBtn.querySelector('span').textContent = 'View Full Demo';
   } else {
      demoBtn.querySelector('span').textContent = 'View Demo';
   }

   // Show modal
   modal.classList.add('active');
   document.body.style.overflow = 'hidden';
}

// Close modal
function closeProjectModal() {
   const modal = document.getElementById('project-modal');
   modal.classList.remove('active');
   document.body.style.overflow = '';
   activeProject = null;
}

// Setup modal close handlers
function setupModalHandlers() {
   const modal = document.getElementById('project-modal');
   const closeBtn = document.querySelector('.modal-close');
   const overlay = document.querySelector('.modal-overlay');
   const demoBtn = document.getElementById('modal-demo');

   closeBtn.addEventListener('click', closeProjectModal);
   overlay.addEventListener('click', closeProjectModal);

   // Close on Escape key
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
         closeProjectModal();
      }
   });

   // Prevent modal content clicks from closing modal
   document.querySelector('.modal-content').addEventListener('click', (e) => {
      e.stopPropagation();
   });

   demoBtn.addEventListener('click', (e) => {
      if (!activeProject) return;
      if (activeProject.videoDemo || activeProject.gifDemo) {
         e.preventDefault();
         renderModalMedia(activeProject, true);
         const modalContent = document.querySelector('.modal-content');
         if (modalContent) {
            modalContent.scrollTo({ top: 0, behavior: 'smooth' });
         }
      }
   });
}

// Initialize projects showcase
document.addEventListener('DOMContentLoaded', () => {
   renderProjects();
   setupFilters();
   setupModalHandlers();
});
