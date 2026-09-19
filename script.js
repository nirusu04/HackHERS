// Keeps track of which screen we're on and updates the trust meter
const trustFill = document.getElementById('trust-fill');

function goToScreen(screenId, trustPercent) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  trustFill.style.width = trustPercent + '%';
}

document.getElementById('btn-get-started').addEventListener('click', () => {
  goToScreen('screen-info', 25);
});

document.getElementById('btn-info-next').addEventListener('click', () => {
  // We'll build screen 3 next — for now just log what they typed
  const userData = {
    name: document.getElementById('input-name').value,
    dob: document.getElementById('input-dob').value,
    email: document.getElementById('input-email').value,
    phone: document.getElementById('input-phone').value,
  };
  console.log('User info so far:', userData);
});