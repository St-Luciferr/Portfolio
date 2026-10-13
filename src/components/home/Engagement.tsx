import { Check } from 'lucide-react';
import { Section } from './Section';

const steps = [
  { title: 'Discovery', text: 'A short call or brief to understand the problem, the users and the constraints.' },
  { title: 'Scope & plan', text: 'A written scope with milestones and a timeline, agreed before any work starts.' },
  { title: 'Build in milestones', text: 'Working software in your repository, with a demo at every milestone.' },
  { title: 'Launch & handover', text: 'Deployment, documentation and a walkthrough so your team can run it.' },
];

const prepare = [
  'A short description of the problem and who it is for',
  'Sample data or documents, for AI features',
  'One person who can answer questions and give feedback',
  'Any existing code, designs or accounts',
];

export function Engagement() {
  return (
    <Section
      id="process"
      eyebrow="How it works"
      title="How an engagement runs."
      intro="A simple, predictable process, whether it is a new product or an AI feature for an existing one."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ol className="grid gap-5 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-white/10 bg-tertiary/40 p-6">
              <span className="text-sm font-bold text-[#cbb5ff]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-white text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-tertiary to-black-100 p-6">
          <h3 className="text-white text-lg font-bold">What you prepare</h3>
          <ul className="mt-5 space-y-4">
            {prepare.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-secondary">
                <Check className="mt-1 h-4 w-4 flex-none text-[#915eff]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
