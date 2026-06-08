import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import type { StepperStep } from './Stepper';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Stepper** is a horizontal progress indicator that guides users through a multi-step workflow.
Each step can be \`active\` (currently focused, shown with a filled circle), \`completed\` (done, shown with a checkmark), or \`pending\` (not yet reached, muted).
Steps are optionally clickable for non-linear navigation — pass \`onStepClick\` to enable jumping to any step.
Use it at the top of a multi-page form, checkout flow, or onboarding sequence to show progress and let users orient themselves within the flow.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const registrationSteps: StepperStep[] = [
  { id: 'account', label: 'Create Account' },
  { id: 'verify', label: 'Verify Email' },
  { id: 'profile', label: 'Set Up Profile' },
  { id: 'done', label: 'Complete' },
];

const checkoutSteps: StepperStep[] = [
  { id: 'cart', label: 'Cart' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirmation' },
];

const onboardingSteps: StepperStep[] = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'done', label: 'Done' },
];

const shortSteps: StepperStep[] = [
  { id: 'fill', label: 'Fill Form' },
  { id: 'review', label: 'Review' },
  { id: 'submit', label: 'Submit' },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal usage: 3-step stepper with the first step active and no completed steps yet.',
      },
    },
  },
  args: {
    steps: shortSteps,
    activeStep: 'fill',
    completedSteps: [],
  },
};

export const Step2Active: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Middle step highlighted — the first step is marked completed, the second is active.',
      },
    },
  },
  args: {
    steps: shortSteps,
    activeStep: 'review',
    completedSteps: ['fill'],
  },
};

export const Completed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All prior steps completed. The last step is active — typically shown on a confirmation screen.',
      },
    },
  },
  args: {
    steps: shortSteps,
    activeStep: 'submit',
    completedSteps: ['fill', 'review'],
  },
};

export const FirstStep: Story = {
  parameters: {
    docs: {
      description: { story: '4-step registration flow at step 1 — no completed steps.' },
    },
  },
  args: {
    steps: registrationSteps,
    activeStep: 'account',
    completedSteps: [],
  },
};

export const MidwayThrough: Story = {
  parameters: {
    docs: {
      description: { story: 'Registration flow at step 3 — two prior steps completed.' },
    },
  },
  args: {
    steps: registrationSteps,
    activeStep: 'profile',
    completedSteps: ['account', 'verify'],
  },
};

export const AllCompleted: Story = {
  parameters: {
    docs: {
      description: { story: 'All steps complete — the active step is the last one.' },
    },
  },
  args: {
    steps: registrationSteps,
    activeStep: 'done',
    completedSteps: ['account', 'verify', 'profile'],
  },
};

export const ManySteps: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Six-step workflow — validates layout on wider flows. Step 3 (Development) is active.',
      },
    },
  },
  args: {
    steps: [
      { id: 's1', label: 'Requirements' },
      { id: 's2', label: 'Design' },
      { id: 's3', label: 'Development' },
      { id: 's4', label: 'Testing' },
      { id: 's5', label: 'Review' },
      { id: 's6', label: 'Deploy' },
    ],
    activeStep: 's3',
    completedSteps: ['s1', 's2'],
  },
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Steps are clickable for non-linear navigation — `onStepClick` is wired. Click any step to jump to it.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('account');
    const ids = registrationSteps.map((s) => s.id);
    const completed = ids.slice(0, ids.indexOf(active));
    return (
      <Stepper
        activeStep={active}
        completedSteps={completed}
        steps={registrationSteps}
        onStepClick={setActive}
      />
    );
  },
};

export const RegistrationFlow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic 4-step registration flow: Create Account → Verify Email → Set Up Profile → Complete. Use Back / Next to walk through.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('account');
    const ids = registrationSteps.map((s) => s.id);
    const completed = ids.slice(0, ids.indexOf(active));

    const panelContent: Record<string, string> = {
      account: 'Enter your email address and choose a secure password to create your account.',
      verify: 'We sent a 6-digit code to your email. Enter it below to verify your address.',
      profile: 'Add a display name, profile photo, and your role to personalise your workspace.',
      done: 'Your account is ready! Click "Go to Dashboard" to start using the app.',
    };

    return (
      <div className="space-y-6 max-w-lg">
        <Stepper
          activeStep={active}
          completedSteps={completed}
          steps={registrationSteps}
          onStepClick={setActive}
        />
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-600 dark:text-gray-300">{panelContent[active]}</p>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={active === ids[0]}
            label="Back"
            severity="secondary"
            onClick={() => setActive(ids[Math.max(0, ids.indexOf(active) - 1)])}
          />
          <Button
            disabled={active === ids[ids.length - 1]}
            label="Next"
            severity="primary"
            onClick={() => setActive(ids[Math.min(ids.length - 1, ids.indexOf(active) + 1)])}
          />
        </div>
        <p className="text-xs text-gray-400">Step: {active}</p>
      </div>
    );
  },
};

export const CheckoutFlow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'E-commerce checkout: Cart → Shipping → Payment → Confirmation. Back navigation is only allowed to completed steps.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('cart');
    const ids = checkoutSteps.map((s) => s.id);
    const completed = ids.slice(0, ids.indexOf(active));
    return (
      <div className="space-y-6 max-w-lg">
        <Stepper
          activeStep={active}
          completedSteps={completed}
          steps={checkoutSteps}
          onStepClick={(id) => {
            if (completed.includes(id)) setActive(id);
          }}
        />
        <div className="flex gap-2">
          <Button
            disabled={active === ids[0]}
            label="Back"
            severity="secondary"
            onClick={() => setActive(ids[Math.max(0, ids.indexOf(active) - 1)])}
          />
          <Button
            disabled={active === ids[ids.length - 1]}
            label={active === 'payment' ? 'Place Order' : 'Continue'}
            severity="primary"
            onClick={() => setActive(ids[Math.min(ids.length - 1, ids.indexOf(active) + 1)])}
          />
        </div>
      </div>
    );
  },
};

export const OnboardingFlow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full onboarding state machine with contextual content per step. Simulates a real new-user setup flow with Welcome → Profile → Preferences → Done.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('welcome');
    const ids = onboardingSteps.map((s) => s.id);
    const completed = ids.slice(0, ids.indexOf(active));

    const content: Record<string, { heading: string; body: string }> = {
      welcome: {
        heading: 'Welcome to Workspace Pro',
        body: 'We are glad you are here. This short setup takes about 2 minutes and helps personalise your experience.',
      },
      profile: {
        heading: 'Tell us about yourself',
        body: 'Add your full name, job title, and a profile photo. This helps your teammates recognise you.',
      },
      preferences: {
        heading: 'Set your preferences',
        body: 'Choose your timezone, default language, and notification preferences to get started.',
      },
      done: {
        heading: 'You are all set!',
        body: 'Your workspace is ready. Click "Go to Dashboard" to start collaborating with your team.',
      },
    };

    const current = content[active];

    return (
      <div className="space-y-6 max-w-lg">
        <Stepper
          activeStep={active}
          completedSteps={completed}
          steps={onboardingSteps}
          onStepClick={setActive}
        />
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-2">
          <h2 className="text-base font-semibold">{current.heading}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{current.body}</p>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={active === ids[0]}
            label="Back"
            severity="secondary"
            onClick={() => setActive(ids[Math.max(0, ids.indexOf(active) - 1)])}
          />
          <Button
            label={active === ids[ids.length - 1] ? 'Go to Dashboard' : 'Continue'}
            severity="primary"
            onClick={() => {
              if (active !== ids[ids.length - 1]) {
                setActive(ids[ids.indexOf(active) + 1]);
              }
            }}
          />
        </div>
      </div>
    );
  },
};
