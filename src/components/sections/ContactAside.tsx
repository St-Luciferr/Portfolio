import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface ContactAsideProps {
  email: string;
  services: { title: string; slug: string }[];
  socialLinks?: { github?: string; linkedin?: string };
}

const steps = [
  { title: 'Send a short brief', text: 'What you want to build, and where it hurts today.' },
  { title: 'I reply within 24–48 hours', text: 'With questions, or a time for a quick call.' },
  { title: 'Agree on scope first', text: 'A clear plan and timeline before any work starts.' },
];

/** Decorative orbit: CSS-only stand-in for the old 3D globe. */
function Orbit() {
  return (
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-70" aria-hidden="true">
      <div className="glow-pulse absolute inset-16 rounded-full bg-[radial-gradient(closest-side,rgba(145,94,255,0.45),transparent)] blur-xl" />
      <div className="orbit-spin absolute inset-6 rounded-full border border-[#915eff]/25">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#b48cff] shadow-[0_0_12px_#915eff]" />
      </div>
      <div className="orbit-spin-reverse absolute inset-16 rounded-full border border-dashed border-white/10">
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#4f8cff] shadow-[0_0_10px_#4f8cff]" />
      </div>
      <div className="absolute inset-[7.5rem] rounded-full border border-white/10" />
    </div>
  );
}

const ContactAside = ({ email, services, socialLinks }: ContactAsideProps) => {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-tertiary via-black-100 to-primary p-8">
      <Orbit />

      <div className="relative">
        <p className="text-secondary uppercase tracking-wider text-sm">How it works</p>
        <h3 className="mt-2 text-white text-2xl font-bold">What happens next</h3>

        <ol className="mt-6 space-y-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#915eff]/50 bg-[#915eff]/10 text-sm font-bold text-[#cbb5ff]">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-white">{step.title}</p>
                <p className="mt-0.5 text-sm text-secondary">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {services.length > 0 && (
          <div className="mt-10">
            <p className="text-secondary uppercase tracking-wider text-sm">I can help with</p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white transition-colors hover:border-[#915eff]/60 hover:bg-[#915eff]/10"
                  >
                    {service.title}
                    <ArrowUpRight className="h-4 w-4 text-secondary transition-colors group-hover:text-[#cbb5ff]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white transition-colors hover:border-[#915eff]/60"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
          {socialLinks?.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/10 p-2.5 text-secondary transition-colors hover:border-[#915eff]/60 hover:text-white"
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
          )}
          {socialLinks?.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-white/10 p-2.5 text-secondary transition-colors hover:border-[#915eff]/60 hover:text-white"
            >
              <FaGithub className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ContactAside;
