import { useEffect } from 'react';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

const tourSteps = [
  {
    element: '[data-intro="dashboard-menu"]',
    intro: "This is your main dashboard menu. Use it to navigate CVS features.",
  },
  {
    element: '[data-intro="dashboard-stats"]',
    intro: 'See your <b>Account Balance</b>, <b>Total Interest</b>, and <b>Active Deposit</b> at a glance.',
  },
  {
    element: '[data-intro="deposit-section"]',
    intro: 'Fund your account here to start earning fixed daily interest.',
  },
  {
    element: '[data-intro="referrals"]',
    intro: 'Grow your network! Share your referral link and earn incentives.',
  },
  {
    element: '[data-intro="franchise-menu"]',
    intro: 'Apply as a franchise or co-partner from this menu.',
  },
  {
    element: '[data-intro="cvs-credit"]',
    intro: 'CVS Credit may be used for future services and expansions.',
  },
  {
    element: '[data-intro="profile"]',
    intro: 'Complete your CVS Profile to get the most out of your account!',
  },
];

export default function OnboardingTour() {
  useEffect(() => {
    if (localStorage.getItem('cvs_onboarding_complete')) return;
    // Add custom white overlay style
    const style = document.createElement('style');
    style.innerHTML = `
      .introjs-overlay {
        background: rgba(255,255,255,0.85) !important;
        transition: background 0.3s;
      }
      .introjs-tooltip {
        border-radius: 1rem;
        box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
        font-size: 1.05em;
        padding: 1.2em 1.5em;
      }
      .introjs-button {
        border-radius: 0.5em;
        font-weight: 600;
        box-shadow: none;
        background: #b8001c;
        color: #fff;
        border: none;
        margin: 0 0.25em;
        transition: background 0.2s;
      }
      .introjs-button:hover {
        background: #a00018;
      }
      .introjs-skipbutton {
        background: #eee;
        color: #b8001c;
      }
    `;
    document.head.appendChild(style);
    // Build steps from data-intro attributes
    const steps = tourSteps
      .map(step => {
        const el = document.querySelector(step.element);
        return el ? { element: el, intro: step.intro } : undefined;
      })
      .filter((s): s is { element: Element; intro: string } => !!s);
    if (!steps.length) return;
    const intro = introJs();
    intro.setOptions({
      steps: steps as any,
      showProgress: true,
      showBullets: false,
      nextLabel: 'Next',
      prevLabel: 'Back',
      doneLabel: 'Finish',
      skipLabel: 'Skip Tour',
      exitOnOverlayClick: false,
      exitOnEsc: true,
      disableInteraction: true,
    });
    intro.oncomplete(() => localStorage.setItem('cvs_onboarding_complete', '1'));
    intro.onexit(() => localStorage.setItem('cvs_onboarding_complete', '1'));
    setTimeout(() => intro.start(), 500);
    return () => { document.head.removeChild(style); };
  }, []);
  return null;
}
