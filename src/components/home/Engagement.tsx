import { Check } from 'lucide-react';
import { Section } from './Section';
import { HUES, type HueName } from './hues';

// A real sequence, so numbered.
const steps = [
  { title: 'Discovery', text: 'A short call or brief to understand the problem, the users and the constraints.' },
  { title: 'Scope and plan', text: 'A written scope with milestones and a timeline, agreed before any work starts.' },
  { title: 'Build in milestones', text: 'Working software in your repository, with a demo at every milestone.' },
  { title: 'Launch and handover', text: 'Deployment, documentation and a walkthrough so your team can run it.' },
];

// Discovery -> scope -> build -> launch walks through the four offer hues.
const stepHues: HueName[] = ['violet', 'sky', 'emerald', 'amber'];

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
      eyebrow="Process"
      title="How an engagement runs"
      intro="A predictable process, whether it is a new product or an AI feature for an existing one."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-fg/10 bg-tertiary p-6 shadow-soft">
            <span className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-semibold ${HUES[stepHues[i]].tile} ${HUES[stepHues[i]].ink}`}
              >
                {i + 1}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-fg/10" />
            </span>
            <h3 className="mt-5 text-fg text-[16px] font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-secondary">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-2xl border border-brand/20 bg-brand/[0.05] p-6 sm:p-7 dark:bg-brand/[0.08]">
        <h3 className="text-fg text-[16px] font-semibold">What you prepare</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {prepare.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-secondary">
              <Check className="mt-1 h-4 w-4 flex-none text-brand-fg" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
