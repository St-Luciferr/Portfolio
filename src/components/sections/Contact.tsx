'use client';

import { useRef, useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '@/lib/styles';
import SectionWrapper from '@/components/hoc/SectionWrapper';
import { slideIn } from '@/lib/motion';
import Lazy3DCanvas from '@/components/canvas/Lazy3DCanvas';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactProps {
  data?: {
    name?: string;
    email?: string;
  };
}

const Contact = ({ data }: ContactProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
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
      alert(
        'Email service is not configured. Please contact me directly at ' + toEmail
      );
      return;
    }

    setLoading(true);

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
          alert('Thank you! I will get back to you as soon as possible.');
          setForm({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS Error:', error);
          alert(
            `Failed to send message. Please email me directly at ${toEmail}`
          );
        }
      );
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className={`xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden`}>
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
        <p className={styles.sectionSubText}>Get In Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <p className="text-secondary text-sm mt-2">
          Have a project idea, want to collaborate, or just want to say hi? I&apos;d love to hear from you.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              What&apos;s this about? <span className="text-secondary font-normal text-sm">(optional)</span>
            </span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g. Collaboration, open source, just saying hi..."
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:bg-tertiary/80 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <p className="text-secondary text-xs">
              I usually respond within 24–48 hours.
            </p>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <Lazy3DCanvas type="earth" />
      </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
