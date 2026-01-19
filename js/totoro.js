// Totoro Interactive Character - Left/Right Movement
const totoroContainer = document.querySelector('.totoro-container');
let isMoving = false;
let movingRight = true;
let currentPosition = 50;

// Initialize Totoro
function initTotoro() {
   if (!totoroContainer) return;

   // Start with idle animation
   totoroContainer.classList.add('idle');

   // Add idle bounce animation periodically
   setInterval(() => {
      if (!isMoving) {
         totoroContainer.classList.add('idle');
      }
   }, 2000);

   // Click handler - toggle direction and move
   totoroContainer.addEventListener('click', () => {
      if (isMoving) return;
      toggleDirectionAndMove();
   });
}

// Toggle direction and move Totoro
function toggleDirectionAndMove() {
   if (isMoving) return;

   isMoving = true;

   // Remove idle animation
   totoroContainer.classList.remove('idle');

   // Jump animation first
   totoroContainer.classList.add('jumping');

   setTimeout(() => {
      totoroContainer.classList.remove('jumping');

      // Determine direction and calculate new position
      const windowWidth = window.innerWidth;
      const totoroWidth = 100; // Width of Totoro
      const margin = 50; // Margin from edges

      let targetPosition;

      if (movingRight) {
         // Move to right side
         targetPosition = windowWidth - totoroWidth - margin;
         totoroContainer.classList.remove('moving-left');
         totoroContainer.classList.add('moving-right');
      } else {
         // Move to left side
         targetPosition = margin;
         totoroContainer.classList.remove('moving-right');
         totoroContainer.classList.add('moving-left');
      }

      // Add walking animation
      totoroContainer.classList.add('walking');

      // Animate to new position
      totoroContainer.style.left = `${targetPosition}px`;
      currentPosition = targetPosition;

      // Toggle direction for next click
      movingRight = !movingRight;

      // Remove walking animation after movement completes
      setTimeout(() => {
         totoroContainer.classList.remove('walking');
         totoroContainer.classList.add('landing');

         setTimeout(() => {
            totoroContainer.classList.remove('landing');
            totoroContainer.classList.add('idle');
            isMoving = false;
         }, 600);
      }, 3000);
   }, 800);
}

// Auto-walk Totoro back and forth (optional)
function autoWalk() {
   if (!isMoving) {
      toggleDirectionAndMove();
   }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initTotoro);
} else {
   initTotoro();
}

// Optional: Auto-walk every 10 seconds
// Uncomment the line below if you want Totoro to walk automatically
// setInterval(autoWalk, 10000);
