const trustFill = document.getElementById('trust-fill');
let userData = {};

function goToScreen(screenId, trustPercent, stepIndex) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  trustFill.style.width = trustPercent + '%';
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === stepIndex);
  });
}

document.getElementById('btn-get-started').addEventListener('click', () => {
  goToScreen('screen-info', 25, 1);
});

document.getElementById('btn-info-next').addEventListener('click', () => {
  userData.name = document.getElementById('input-name').value;
  userData.dob = document.getElementById('input-dob').value;
  userData.email = document.getElementById('input-email').value;
  userData.phone = document.getElementById('input-phone').value;
  goToScreen('screen-product', 50, 2);
});

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    userData.product = card.dataset.product;
  });
});

document.getElementById('btn-product-next').addEventListener('click', () => {
  if (!userData.product) {
    alert('Please select an account type to continue.');
    return;
  }
  goToScreen('screen-verify', 75, 3);
});

document.getElementById('btn-scan-id').addEventListener('click', () => {
  const status = document.getElementById('id-status');
  document.getElementById('btn-scan-id').disabled = true;
  status.textContent = 'Scanning...';
  setTimeout(() => {
    status.textContent = 'Verified ✓';
    status.classList.add('done');
    document.getElementById('btn-verify-phone').disabled = false;
  }, 1500);
});

document.getElementById('btn-verify-phone').addEventListener('click', () => {
  const status = document.getElementById('phone-status');
  document.getElementById('btn-verify-phone').disabled = true;
  status.textContent = 'Sending code...';
  setTimeout(() => {
    status.textContent = 'Verified ✓';
    status.classList.add('done');
    document.getElementById('btn-verify-next').disabled = false;
  }, 1500);
});

document.getElementById('btn-verify-next').addEventListener('click', () => {
  document.getElementById('success-name').textContent = userData.name || 'there';
  document.getElementById('summary-product').textContent = userData.product;
  document.getElementById('summary-email').textContent = userData.email;
  document.getElementById('summary-phone').textContent = userData.phone;
  goToScreen('screen-success', 100, 3);
});

document.getElementById('btn-restart').addEventListener('click', () => {
  userData = {};
  document.getElementById('input-name').value = '';
  document.getElementById('input-dob').value = '';
  document.getElementById('input-email').value = '';
  document.getElementById('input-phone').value = '';
  document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('id-status').textContent = 'Not started';
  document.getElementById('id-status').classList.remove('done');
  document.getElementById('phone-status').textContent = 'Not started';
  document.getElementById('phone-status').classList.remove('done');
  document.getElementById('btn-scan-id').disabled = false;
  document.getElementById('btn-verify-phone').disabled = true;
  document.getElementById('btn-verify-next').disabled = true;
  goToScreen('screen-welcome', 0, 0);
});