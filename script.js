const trustFill = document.getElementById('trust-fill');

// Holds everything the user enters across the whole flow
let userData = {};

function goToScreen(screenId, trustPercent, stepIndex) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  trustFill.style.width = trustPercent + '%';

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === stepIndex);
  });
}

// Screen 1 -> 2
document.getElementById('btn-get-started').addEventListener('click', () => {
  goToScreen('screen-info', 25, 1);
});

// Screen 2 -> 3
document.getElementById('btn-info-next').addEventListener('click', () => {
  userData.name = document.getElementById('input-name').value;
  userData.dob = document.getElementById('input-dob').value;
  userData.email = document.getElementById('input-email').value;
  userData.phone = document.getElementById('input-phone').value;

  console.log('User info so far:', userData);
  goToScreen('screen-product', 50, 2);
});

// Product card selection
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    userData.product = card.dataset.product;
    console.log('Selected product:', userData.product);
  });
});

// Screen 3 -> next (screen 4 doesn't exist yet, just log for now)
document.getElementById('btn-product-next').addEventListener('click', () => {
  if (!userData.product) {
    alert('Please select an account type to continue.');
    return;
  }
  console.log('Full data so far:', userData);
  // goToScreen('screen-verify', 75, 3);  <-- we'll uncomment this once Screen 4 exists
});