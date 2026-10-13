'use client';

import Link from 'next/link';
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
    { key: 'github', href: socialLinks?.github, Icon: FaGithub, label: 'GitHub', hoverClass: 'hover:text-fg' },
    { key: 'linkedin', href: socialLinks?.linkedin, Icon: FaLinkedin, label: 'LinkedIn', hoverClass: 'hover:text-[#0A66C2]' },
    { key: 'twitter', href: socialLinks?.twitter, Icon: FaTwitter, label: 'Twitter / X', hoverClass: 'hover:text-[#1DA1F2]' },
  ].filter(s => !!s.href);

  const getHref = (linkId: string) => {
    if (linkId.startsWith('/')) return linkId;
    return `/#${linkId}`;
  };

  return (
    <footer className="relative border-t border-fg/10 bg-primary">
      <div className={styles.paddingX}>
      <div className="max-w-6xl mx-auto py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-fg font-semibold text-lg tracking-[-0.01em] w-fit hover:text-brand-fg transition-colors duration-200"
            >
              {name}
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              Full-stack developer building web apps, APIs and the AI assistants inside them, for startups and growing teams.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-fg font-medium text-sm">Explore</h4>
            <ul className="flex flex-col gap-3">
              {links.map(link => (
                <li key={link.linkId}>
                  <Link
                    href={getHref(link.linkId)}
                    className="text-secondary hover:text-fg text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="text-fg font-medium text-sm">Get in touch</h4>
            <p className="text-secondary text-sm leading-relaxed">
              Have a project in mind? <Link href="/#contact" className="text-fg underline underline-offset-4 hover:text-brand-fg">Send a short brief</Link> and I&apos;ll reply within 24–48 hours.
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
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-fg/[0.07] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-secondary text-xs">
            © {year} {name}. All rights reserved.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
