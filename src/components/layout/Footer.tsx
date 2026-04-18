'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { styles } from '@/lib/styles';

interface FooterProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  navLinks?: Array<{ linkId: string; title: string }>;
  name?: string;
}

const defaultNavLinks = [
  { linkId: 'about', title: 'About' },
  { linkId: 'work', title: 'Experience' },
  { linkId: '/projects', title: 'Projects' },
  { linkId: '/blog', title: 'Blog' },
  { linkId: 'contact', title: 'Contact' },
];

const Footer = ({ socialLinks, navLinks, name = 'Santosh Pandey' }: FooterProps) => {
  const year = new Date().getFullYear();
  const baseLinks = navLinks?.length ? navLinks : defaultNavLinks;
  const hasBlog = baseLinks.some(
    (l) => l.linkId === '/blog' || l.linkId === 'blog'
  );
  const links = hasBlog
    ? baseLinks
    : [...baseLinks, { linkId: '/blog', title: 'Blog' }];

  const socials = [
    { key: 'github', href: socialLinks?.github, Icon: FaGithub, label: 'GitHub', hoverClass: 'hover:text-white' },
    { key: 'linkedin', href: socialLinks?.linkedin, Icon: FaLinkedin, label: 'LinkedIn', hoverClass: 'hover:text-[#0A66C2]' },
    { key: 'twitter', href: socialLinks?.twitter, Icon: FaTwitter, label: 'Twitter / X', hoverClass: 'hover:text-[#1DA1F2]' },
  ].filter(s => !!s.href);

  const getHref = (linkId: string) => {
    if (linkId.startsWith('/')) return linkId;
    return `/#${linkId}`;
  };

  return (
    <footer className="relative bg-black-100 z-10">
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#804dee] to-transparent opacity-50" />

      <div className={`${styles.paddingX} max-w-7xl mx-auto py-14`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-white font-bold text-xl w-fit hover:text-[#804dee] transition-colors duration-200"
            >
              {name}
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              ML Engineer &amp; Full Stack Developer. I build intelligent systems and genuinely enjoy talking about AI, open source, and ideas worth exploring.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map(link => (
                <li key={link.linkId}>
                  <Link
                    href={getHref(link.linkId)}
                    className="text-secondary hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest">
              Let&apos;s Connect
            </h4>
            <p className="text-secondary text-sm leading-relaxed">
              Whether it&apos;s a project idea, a collaboration, or just a chat about something cool, I&apos;m always happy to hear from you.
            </p>
            {socials.length > 0 && (
              <div className="flex gap-5 mt-1">
                {socials.map(({ key, href, Icon, label, hoverClass }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`text-secondary ${hoverClass} transition-colors duration-200`}
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-secondary text-xs">
            © {year} {name}. All rights reserved.
          </p>
          <p className="text-secondary text-xs">
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
