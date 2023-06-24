//your JS code here. If required.
const quoteDisplay = document.getElementById('quoteText');
const quoteInput = document.getElementById('quoteInput');
const timer = document.getElementById('timerText');
let startTime, timerInterval;

// Fetch a random quote from the API
function fetchRandomQuote() {
  fetch('http://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      quoteDisplay.textContent = data.content;
      quoteInput.value = '';
      startTimer();
    })
    .catch(error => console.log(error));
}

// Start the timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

// Update the timer display
function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  // timer.textContent = elapsedTime;
}

// Check the typed text
function checkTypedText() {
  const typedText = quoteInput.value;
  const originalText = quoteDisplay.textContent;

  if (typedText === originalText) {
    clearInterval(timerInterval);
    setTimeout(fetchRandomQuote, 3000);
  } else {
    quoteInput.classList.remove('correct');
    quoteInput.classList.remove('incorrect');

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === originalText[i]) {
        quoteInput.classList.add('correct');
      } else {
        quoteInput.classList.add('incorrect');
        break;
      }
    }
  }
}

// Event listeners
quoteInput.addEventListener('input', checkTypedText);

// Fetch the initial quote
fetchRandomQuote();
