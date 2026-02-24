// script.js – manual celebration only
(function() {
  const heartsContainer = document.getElementById('heartsContainer');
  const heartSymbols = ['👑', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '❤️‍🔥', '💖', '💗', '⭐', '✨'];
  const heartCount = 30;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    const size = 1.0 + Math.random() * 2.5;
    heart.style.fontSize = `${size}rem`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${12 + Math.random() * 22}s`;
    heart.style.animationDelay = `${Math.random() * -25}s`;
    heart.style.opacity = 0.3 + Math.random() * 0.6;
    heart.style.color = `hsl(${30 + Math.random() * 25}, 85%, 70%)`;
    heartsContainer.appendChild(heart);
  }

  const frontPage = document.getElementById('frontPage');
  const mainContainer = document.getElementById('mainContainer');
  const beginBtn = document.getElementById('beginBtn');

  beginBtn.addEventListener('click', () => {
    frontPage.style.opacity = '0';
    setTimeout(() => {
      frontPage.style.display = 'none';
      mainContainer.style.display = 'block';
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 }, colors: ['#f5b17b', '#ca8a5c', '#ffdab0'] });
    }, 550);
  });

  const pages = document.querySelectorAll('.page');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  const pageCounter = document.getElementById('pageCounter');
  const totalPages = pages.length;
  let currentPage = 0;

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dot.addEventListener('click', function() {
      goToPage(parseInt(this.dataset.index));
    });
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll('.dot');

  const overlay = document.getElementById('thankYouOverlay');
  const celebrateLastBtn = document.getElementById('celebrateLastBtn');
  let hasCelebrated = false;

  function triggerCelebration() {
    if (hasCelebrated) return;
    hasCelebrated = true;
    overlay.classList.add('show');
    confetti({ particleCount: 200, spread: 130, origin: { y: 0.5 }, colors: ['#f5b17b', '#ca8a5c', '#ffdab0', '#f0e6d8'] });
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 180, origin: { y: 0.4, x: 0.2 }, startVelocity: 30, colors: ['#b5764a', '#f5d7b0'] });
    }, 150);
    setTimeout(() => {
      confetti({ particleCount: 250, spread: 100, origin: { y: 0.6, x: 0.8 }, startVelocity: 25, colors: ['#ca8a5c', '#ffecd7'] });
    }, 300);
    setTimeout(() => {
      confetti({ particleCount: 300, spread: 150, origin: { y: 0.5 }, colors: ['#f5b17b', '#d4a178', '#b5764a'] });
    }, 500);
    if (celebrateLastBtn) {
      celebrateLastBtn.classList.add('hidden');
    }
  }

  if (celebrateLastBtn) {
    celebrateLastBtn.addEventListener('click', triggerCelebration);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      goToPage(0);
    }
  });

  function goToPage(index) {
    if (index < 0 || index >= totalPages) return;
    pages.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });
    currentPage = index;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    pageCounter.textContent = `memory ${index+1} of ${totalPages}`;
    prevBtn.disabled = (index === 0);
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
  });

  goToPage(0);
})();