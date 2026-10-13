import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface ContactAsideProps {
  email: string;
  services: { title: string; slug: string }[];
  socialLinks?: { github?: string; linkedin?: string };
  bookingUrl?: string;
  whatsapp?: string;
  availability?: string;
  location?: string;
}

/** Decorative orbit: CSS-only stand-in for the old 3D globe. */
function Orbit() {
  return (
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-70" aria-hidden="true">
      <div className="orbit-spin absolute inset-6 rounded-full border border-brand/25">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_12px_rgb(var(--site-brand))]" />
      </div>
      <div className="orbit-spin-reverse absolute inset-16 rounded-full border border-dashed border-fg/10">
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-500 shadow-[0_0_10px_theme(colors.sky.500)]" />
      </div>
      <div className="absolute inset-[7.5rem] rounded-full border border-fg/10" />
    </div>
  );
}

const ContactAside = ({
  email,
  services,
  socialLinks,
  bookingUrl,
  whatsapp,
  availability,
  location,
}: ContactAsideProps) => {
  return (
    <aside className="relative h-fit overflow-hidden rounded-2xl bg-black-100 p-6 shadow-lift sm:p-9">
      <Orbit />

      <div className="relative">
        <h3 className="text-fg text-xl font-semibold tracking-[-0.01em]">Prefer to talk first?</h3>
        <p className="mt-3 text-sm leading-6 text-secondary">
          I usually reply within 24–48 hours. Not sure what you need yet? Send a rough idea and we&apos;ll figure out the scope together.
        </p>

        {(availability || location) && (
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {availability && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {availability}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1.5 text-secondary">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
            )}
          </div>
        )}

        {(bookingUrl || whatsapp) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-strong"
              >
                <CalendarDays className="h-4 w-4" />
                Book a call
              </a>
            )}
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-fg/10 px-4 py-2.5 text-sm text-fg transition-colors hover:border-emerald-400/60"
              >
                <FaWhatsapp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                WhatsApp
              </a>
            )}
          </div>
        )}

        {services.length > 0 && (
          <div className="mt-8">
            <p className="text-fg text-sm font-medium">I can help with</p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between rounded-lg border border-fg/10 bg-tertiary px-4 py-3 text-sm text-fg transition-colors hover:border-brand/50"
                  >
                    {service.title}
                    <ArrowUpRight className="h-4 w-4 text-secondary transition-colors group-hover:text-brand-fg" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-fg/10 px-4 py-2.5 text-sm text-fg transition-colors hover:border-brand/60"
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
              className="rounded-lg border border-fg/10 p-2.5 text-secondary transition-colors hover:border-brand/60 hover:text-fg"
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
              className="rounded-lg border border-fg/10 p-2.5 text-secondary transition-colors hover:border-brand/60 hover:text-fg"
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
