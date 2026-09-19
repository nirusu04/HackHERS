# TrustPath - UFCU Smooth Onboarding

TrustPath is a simple, welcoming account-opening experience designed for new UFCU members. It turns onboarding into a short guided journey that feels clear, trustworthy, and easy to complete instead of overwhelming.

## Experience

The flow is built around a visible Trust Meter and small, focused steps:

1. **Welcome** - Introduces the experience and sets a friendly tone.
2. **Member information** - Collects the member's name, date of birth, email, and phone number.
3. **Account selection** - Lets the member choose Checking, Savings, or Credit Builder.
4. **Identity verification** - Demonstrates ID and phone verification with clear progress states.
5. **Personalized result** - Shows a 100% Trust Meter and an account summary using the member's submitted information.

The final screen gives the member a satisfying sense of completion with a verified identity indicator and a clear **Start Over** option for another demo run.

## Design Goals

- Make the first-time experience feel calm and approachable.
- Keep each step focused on one decision or action.
- Show progress clearly so members always know where they are.
- Use plain language and visible feedback throughout the flow.
- End with a personalized result rather than an unexplained stopping point.

## Current Demo

This is a front-end MVP built with plain HTML, CSS, and JavaScript. The verification steps are mocked for demonstration purposes; no real identity checks or account creation take place.

The project includes:

- UFCU-branded header and local logo asset
- Responsive onboarding screens
- Trust Meter progress indicator
- Account type selection
- Personalized success summary
- Full Start Over reset flow

## Run Locally

Open `index.html` directly in a browser, or serve the folder with a local static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project Files

- `index.html` - Page structure and onboarding screens
- `style.css` - Layout, branding, and screen styles
- `script.js` - Navigation, progress updates, verification states, and reset behavior
- `ufcu-logo.svg` - Local UFCU logo asset used in the header
