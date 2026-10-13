'use client';

import { useRef, useState, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';

import { styles } from '@/lib/styles';
import { track } from '@/lib/analytics';
import ContactAside from '@/components/sections/ContactAside';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus =
  | { kind: 'idle' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

const inputClass =
  'rounded-lg border border-fg/10 bg-black-100 px-4 py-3 text-[15px] text-fg placeholder:text-secondary/80 outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/15';

interface ContactProps {
  data?: {
    name?: string;
    email?: string;
  };
  services?: { title: string; slug: string }[];
  socialLinks?: { github?: string; linkedin?: string };
  bookingUrl?: string;
  whatsapp?: string;
  availability?: string;
  location?: string;
}

const Contact = ({
  data,
  services = [],
  socialLinks,
  bookingUrl,
  whatsapp,
  availability,
  location,
}: ContactProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ kind: 'idle' });
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const toName = data?.name || 'Santosh';
  const toEmail = data?.email || 'suntoss.pandey@gmail.com';

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate EmailJS configuration
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        kind: 'error',
        message: 'The contact form is temporarily unavailable.',
      });
      return;
    }

    setLoading(true);
    setStatus({ kind: 'idle' });

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: toName,
          from_email: form.email,
          to_email: toEmail,
          message: form.subject ? `[${form.subject}]\n\n${form.message}` : form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          track('contact_submit', {
            status: 'success',
            hasSubject: !!form.subject.trim(),
          });
          setStatus({ kind: 'success' });
          setForm({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          track('contact_submit', {
            status: 'error',
            hasSubject: !!form.subject.trim(),
          });
          console.error('EmailJS Error:', error);
          setStatus({
            kind: 'error',
            message: 'Your message could not be sent.',
          });
        }
      );
  };

  return (
    <section id="contact" className={`scroll-mt-20 py-20 sm:py-28 ${styles.paddingX}`}>
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-fg/10 bg-tertiary p-6 shadow-soft sm:p-9">
        <h2 className="text-fg text-[30px] sm:text-[40px] font-semibold leading-[1.15] tracking-[-0.02em]">Start a project</h2>
        <p className="text-secondary text-[15px] mt-3">
          Tell me what you want to build or fix. A few sentences is enough to start.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-9 flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="text-fg text-sm font-medium mb-2">Your name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className={inputClass}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-fg text-sm font-medium mb-2">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className={inputClass}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-fg text-sm font-medium mb-2">
              What&apos;s this about? <span className="text-secondary font-normal text-sm">(optional)</span>
            </span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g. Collaboration, open source, just saying hi..."
              className={inputClass}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-fg text-sm font-medium mb-2">Your message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className={inputClass}
              required
            />
          </label>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-brand py-3 px-7 w-fit text-white text-[15px] font-medium rounded-lg shadow-soft hover:bg-brand-strong transition-colors disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {loading ? 'Sending…' : 'Send message'}
            </button>
            <p className="text-secondary text-xs">
              I usually respond within 24–48 hours.
            </p>
            <div aria-live="polite" role="status">
              {status.kind === 'success' && (
                <p className="mt-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
                  Thanks, your message is on its way. I&apos;ll reply to the email you gave.
                </p>
              )}
              {status.kind === 'error' && (
                <p className="mt-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-200">
                  {status.message} Please email me directly at{' '}
                  <a href={`mailto:${toEmail}`} className="underline underline-offset-4">
                    {toEmail}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </form>
      </div>

      <ContactAside
        email={toEmail}
        services={services}
        socialLinks={socialLinks}
        bookingUrl={bookingUrl}
        whatsapp={whatsapp}
        availability={availability}
        location={location}
      />
      </div>
    </div>
    </section>
  );
};

export default Contact;
