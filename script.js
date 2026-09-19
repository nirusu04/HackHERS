const trustFill = document.getElementById('trust-fill');
const applicationScroll = document.getElementById('application-scroll');
const applicationSteps = document.querySelectorAll('.application-step');
let userData = {};

function goToScreen(screenId, trustPercent) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  trustFill.style.width = trustPercent + '%';
}

document.getElementById('btn-get-started').addEventListener('click', () => {
  goToScreen('screen-eligibility', 20);
});

document.getElementById('btn-login').addEventListener('click', () => {
  goToScreen('screen-eligibility', 20);
});

const eligibilityNext = document.getElementById('btn-eligibility-next');
const affiliationCard = document.getElementById('btn-affiliation');
const accCard = document.getElementById('btn-acc');
const affiliationSelectWrap = document.getElementById('affiliation-select-wrap');
const affiliationSelect = document.getElementById('input-affiliation');
const accModal = document.getElementById('acc-modal');

function selectEligibilityCard(selectedCard) {
  [affiliationCard, accCard].forEach(card => card.classList.toggle('selected', card === selectedCard));
  eligibilityNext.disabled = selectedCard === affiliationCard && !affiliationSelect.value;
}

affiliationCard.addEventListener('click', () => {
  selectEligibilityCard(affiliationCard);
  affiliationSelectWrap.hidden = false;
});

accCard.addEventListener('click', () => {
  selectEligibilityCard(accCard);
  affiliationSelectWrap.hidden = true;
  affiliationSelect.value = '';
  accModal.hidden = false;
});

document.getElementById('btn-close-acc-modal').addEventListener('click', () => {
  accModal.hidden = true;
});

accModal.addEventListener('click', event => {
  if (event.target === accModal) accModal.hidden = true;
});

affiliationSelect.addEventListener('change', () => {
  eligibilityNext.disabled = !affiliationSelect.value;
});

eligibilityNext.addEventListener('click', () => {
  userData.affiliation = accCard.classList.contains('selected') ? 'American Consumer Council' : affiliationSelect.value;
  goToScreen('screen-application', 35);
  applicationScroll.scrollTop = 0;
});

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.product-card').forEach(item => item.classList.remove('selected'));
    card.classList.add('selected');
    userData.product = card.dataset.product;
    updateApplicationProgress();
  });
});

document.getElementById('btn-scan-id').addEventListener('click', () => {
  const status = document.getElementById('id-status');
  document.getElementById('btn-scan-id').disabled = true;
  status.textContent = 'Scanning...';
  setTimeout(() => {
    status.textContent = 'Verified';
    status.classList.add('done');
    document.getElementById('btn-verify-phone').disabled = false;
    updateApplicationProgress();
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

function updateSummary() {
  document.getElementById('summary-product').textContent = userData.product || 'Not selected';
  document.getElementById('summary-name').textContent = userData.name || 'Not provided';
  document.getElementById('summary-email').textContent = userData.email || 'Not provided';
  document.getElementById('summary-phone').textContent = userData.phone || 'Not provided';
}

function updateApplicationProgress() {
  const productComplete = Boolean(userData.product);
  const infoComplete = ['name', 'dob', 'email', 'phone'].every(field => userData[field]);
  const verificationComplete = document.getElementById('phone-status').classList.contains('done');
  const agreementComplete = document.getElementById('input-agree').checked;
  const completed = [productComplete, infoComplete, verificationComplete, agreementComplete].filter(Boolean).length;
  trustFill.style.width = (35 + completed * 13) + '%';
  applicationSteps.forEach((step, index) => step.classList.toggle('active', index <= completed));
}

['name', 'dob', 'email', 'phone'].forEach(field => {
  document.getElementById('input-' + field).addEventListener('input', event => {
    userData[field] = event.target.value.trim();
    updateApplicationProgress();
  });
});

applicationScroll.addEventListener('scroll', () => {
  const disclosure = document.getElementById('disclosure-section');
  const disclosureBottom = disclosure.offsetTop + disclosure.offsetHeight;
  const reachedDisclosureEnd = applicationScroll.scrollTop + applicationScroll.clientHeight >= disclosureBottom - 20;
  const agreement = document.getElementById('input-agree');
  agreement.disabled = !reachedDisclosureEnd;
  if (reachedDisclosureEnd) disclosure.classList.add('visited');
  updateApplicationProgress();
});

document.getElementById('input-agree').addEventListener('change', event => {
  document.getElementById('btn-finish').disabled = !event.target.checked;
  updateApplicationProgress();
  if (event.target.checked) updateSummary();
});

document.getElementById('btn-finish').addEventListener('click', () => {
  updateSummary();
  trustFill.style.width = '100%';
  document.getElementById('summary-section').classList.add('complete');
});

document.getElementById('btn-restart').addEventListener('click', () => {
  userData = {};
  ['name', 'dob', 'email', 'phone'].forEach(field => { document.getElementById('input-' + field).value = ''; });
  document.querySelectorAll('.product-card').forEach(card => card.classList.remove('selected'));
  affiliationCard.classList.remove('selected');
  accCard.classList.remove('selected');
  affiliationSelectWrap.hidden = true;
  affiliationSelect.value = '';
  eligibilityNext.disabled = true;
  accModal.hidden = true;
  document.getElementById('id-status').textContent = 'Not started';
  document.getElementById('id-status').classList.remove('done');
  document.getElementById('phone-status').textContent = 'Not started';
  document.getElementById('phone-status').classList.remove('done');
  document.getElementById('btn-scan-id').disabled = false;
  document.getElementById('btn-verify-phone').disabled = true;
  document.getElementById('input-agree').checked = false;
  document.getElementById('input-agree').disabled = true;
  document.getElementById('btn-finish').disabled = true;
  document.getElementById('summary-section').classList.remove('complete');
  applicationSteps.forEach((step, index) => step.classList.toggle('active', index === 0));
  applicationScroll.scrollTop = 0;
  goToScreen('screen-welcome', 0);
});
