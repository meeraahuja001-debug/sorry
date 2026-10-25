const screens = Array.from(document.querySelectorAll('.screen'));
const pageNumber = document.getElementById('page-number');
const scannerStatus = document.getElementById('scanner-status');

const pages = {
  1: '1 / 8',
  2: '2 / 8',
  3: '3 / 8',
  4: '4 / 8',
  5: '5 / 8',
  6: '6 / 8',
  7: '7 / 8',
  8: '8 / 8'
};

const scannerSequence = [
  'ARE WE SOULMATES? 🥹❤️',
  'SCANNING TWO CUTIES… 🔍💗',
  'CHECKING THE LOVE CONNECTION… 💋',
  'ANALYSING THE CUTENESS LEVEL… 😭🫶🏻',
  'SOULMATE REPORT IS READY… ♾️❤️‍🔥'
];

let currentPage = 1;
let scannerInterval = null;

function showScreen(pageNumberValue) {
  const nextPage = Math.min(Math.max(pageNumberValue, 1), 8);
  currentPage = nextPage;

  screens.forEach((screen) => {
    const screenNumber = Number(screen.dataset.screen);
    screen.classList.toggle('active', screenNumber === currentPage);
  });

  pageNumber.textContent = pages[currentPage] || '1 / 8';

  if (currentPage === 5) {
    startScanner();
  } else {
    stopScanner();
  }
}

function startScanner() {
  if (scannerInterval) {
    clearInterval(scannerInterval);
  }

  let index = 0;
  scannerStatus.textContent = scannerSequence[index];

  scannerInterval = setInterval(() => {
    index = (index + 1) % scannerSequence.length;
    scannerStatus.textContent = scannerSequence[index];
  }, 1200);
}

function stopScanner() {
  if (scannerInterval) {
    clearInterval(scannerInterval);
    scannerInterval = null;
  }
}

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetPage = Number(event.currentTarget.dataset.target);
    if (Number.isFinite(targetPage)) {
      showScreen(targetPage);
    }
  });
});

document.querySelectorAll('[data-action="back"]').forEach((button) => {
  button.addEventListener('click', () => {
    showScreen(currentPage - 1);
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && currentPage < 8) {
    showScreen(currentPage + 1);
  }

  if (event.key === 'ArrowLeft' && currentPage > 1) {
    showScreen(currentPage - 1);
  }
});

showScreen(1);
