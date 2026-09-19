const trustFill = document.getElementById('trust-fill');
const applicationScroll = document.getElementById('application-scroll');
const applicationSteps = document.querySelectorAll('.application-step');
const siteShell = document.querySelector('.site-shell');
const requiredFields = ['first-name', 'last-name', 'ssn', 'dob', 'email', 'phone', 'address', 'city', 'state', 'zip'];
let userData = {};

function goToScreen(screenId, trustPercent) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  trustFill.style.width = trustPercent + '%';
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  applicationScroll.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
}

function updateApplicationProgress() {
  const accountComplete = Boolean(userData.product);
  const detailsComplete = requiredFields.every(field => userData[field]);
  const fundingComplete = Boolean(userData.funding);
  const verificationComplete = document.getElementById('phone-status').classList.contains('done');
  const completion = [accountComplete, detailsComplete, fundingComplete, verificationComplete];
  const completedCount = completion.filter(Boolean).length;

  trustFill.style.width = (35 + completedCount * 16.25) + '%';
  applicationSteps.forEach((step, index) => step.classList.toggle('active', index <= completedCount));
  document.getElementById('btn-account-next').disabled = !accountComplete;
  document.getElementById('btn-details-next').disabled = !detailsComplete;
  document.getElementById('btn-funding-next').disabled = !fundingComplete;
  document.getElementById('btn-verification-next').disabled = !verificationComplete;
  document.getElementById('btn-finish').disabled = !verificationComplete;
}

function updateSummary() {
  document.getElementById('summary-product').textContent = userData.product || 'Not selected';
  document.getElementById('summary-name').textContent = `${userData['first-name'] || ''} ${userData['last-name'] || ''}`.trim() || 'Not provided';
  document.getElementById('summary-email').textContent = userData.email || 'Not provided';
  document.getElementById('summary-phone').textContent = userData.phone || 'Not provided';
}

function resetApplication() {
  userData = {};
  requiredFields.forEach(field => { document.getElementById('input-' + field).value = ''; });
  document.getElementById('input-apt').value = '';
  document.getElementById('input-address-same').checked = false;
  document.querySelectorAll('.product-card').forEach(card => card.classList.remove('selected', 'expanded'));
  document.querySelectorAll('.funding-option').forEach(option => option.classList.remove('selected'));
  document.getElementById('funding-method').hidden = true;
  document.getElementById('btn-bank-login').classList.remove('selected');
  document.getElementById('id-status').textContent = 'Not started';
  document.getElementById('id-status').classList.remove('done');
  document.getElementById('phone-status').textContent = 'Not started';
  document.getElementById('phone-status').classList.remove('done');
  document.getElementById('btn-scan-id').disabled = false;
  document.getElementById('btn-verify-phone').disabled = true;
  document.getElementById('btn-finish').disabled = true;
  applicationSteps.forEach((step, index) => step.classList.toggle('active', index === 0));
  applicationScroll.scrollTop = 0;
  siteShell.classList.remove('application-mode');
  goToScreen('screen-welcome', 0);
}

document.getElementById('btn-get-started').addEventListener('click', () => goToScreen('screen-eligibility', 20));
document.getElementById('btn-login').addEventListener('click', () => goToScreen('screen-eligibility', 20));
document.getElementById('btn-eligibility-back').addEventListener('click', () => goToScreen('screen-welcome', 0));

const eligibilityNext = document.getElementById('btn-eligibility-next');
const affiliationCard = document.getElementById('btn-affiliation');
const accCard = document.getElementById('btn-acc');
const affiliationSelectWrap = document.getElementById('affiliation-select-wrap');
const affiliationSelect = document.getElementById('input-affiliation');
const accModal = document.getElementById('acc-modal');

affiliationCard.addEventListener('click', () => {
  affiliationCard.classList.add('selected');
  accCard.classList.remove('selected');
  affiliationSelectWrap.hidden = false;
  eligibilityNext.disabled = !affiliationSelect.value;
});

accCard.addEventListener('click', () => {
  accCard.classList.add('selected');
  affiliationCard.classList.remove('selected');
  affiliationSelectWrap.hidden = true;
  affiliationSelect.value = '';
  eligibilityNext.disabled = false;
  accModal.hidden = false;
});

document.getElementById('btn-close-acc-modal').addEventListener('click', () => { accModal.hidden = true; });
accModal.addEventListener('click', event => { if (event.target === accModal) accModal.hidden = true; });
affiliationSelect.addEventListener('change', () => { eligibilityNext.disabled = !affiliationSelect.value; });

eligibilityNext.addEventListener('click', () => {
  userData.affiliation = accCard.classList.contains('selected') ? 'American Consumer Council' : affiliationSelect.value;
  siteShell.classList.add('application-mode');
  goToScreen('screen-application', 35);
  applicationScroll.scrollTop = 0;
});

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.product-card').forEach(item => item.classList.remove('selected', 'expanded'));
    card.classList.add('selected', 'expanded');
    userData.product = card.dataset.product;
    updateApplicationProgress();
  });
});

const ssnInput = document.getElementById('input-ssn');
ssnInput.addEventListener('input', event => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 9);
  const formatted = digits.replace(/(\d{3})(\d{2})(\d{0,4})/, '$1-$2-$3').replace(/-$/, '');
  event.target.value = formatted;
  userData.ssn = digits.length === 9 ? formatted : '';
  updateApplicationProgress();
});

requiredFields.filter(field => field !== 'ssn').forEach(field => {
  document.getElementById('input-' + field).addEventListener('input', event => {
    userData[field] = event.target.value.trim();
    updateApplicationProgress();
  });
});

[
  ['btn-account-next', 'details-section'],
  ['btn-details-next', 'funding-section'],
  ['btn-funding-next', 'verification-section'],
  ['btn-verification-next', 'summary-section']
].forEach(([buttonId, sectionId]) => {
  document.getElementById(buttonId).addEventListener('click', () => {
    if (sectionId === 'summary-section') updateSummary();
    scrollToSection(sectionId);
  });
});

document.getElementById('btn-application-back').addEventListener('click', () => {
  siteShell.classList.remove('application-mode');
  goToScreen('screen-eligibility', 20);
});
document.querySelectorAll('.section-back').forEach(button => button.addEventListener('click', () => scrollToSection(button.dataset.backSection)));

document.querySelectorAll('.funding-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.funding-option').forEach(item => item.classList.remove('selected'));
    option.classList.add('selected');
    userData.funding = option.dataset.funding;
    document.getElementById('funding-method').hidden = option.dataset.funding !== 'yes';
    updateApplicationProgress();
  });
});

document.getElementById('btn-bank-login').addEventListener('click', event => {
  event.currentTarget.classList.toggle('selected');
  userData.fundingMethod = event.currentTarget.classList.contains('selected') ? 'Bank login' : '';
});

document.getElementById('btn-scan-id').addEventListener('click', () => {
  const status = document.getElementById('id-status');
  document.getElementById('btn-scan-id').disabled = true;
  status.textContent = 'Scanning...';
  setTimeout(() => {
    status.textContent = 'Verified';
    status.classList.add('done');
    document.getElementById('btn-verify-phone').disabled = false;
  }, 1000);
});

document.getElementById('btn-verify-phone').addEventListener('click', () => {
  const status = document.getElementById('phone-status');
  document.getElementById('btn-verify-phone').disabled = true;
  status.textContent = 'Sending code...';
  setTimeout(() => {
    status.textContent = 'Verified';
    status.classList.add('done');
    updateApplicationProgress();
  }, 1000);
});

document.getElementById('btn-finish').addEventListener('click', () => {
  updateSummary();
  trustFill.style.width = '100%';
  applicationSteps.forEach(step => step.classList.add('active'));
});

document.getElementById('btn-restart').addEventListener('click', resetApplication);
