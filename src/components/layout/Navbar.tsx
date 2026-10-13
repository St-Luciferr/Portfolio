'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { styles } from '@/lib/styles';
import type { NavLink } from '@/types/frontend';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  navLinks?: NavLink[];
  /** Booking link from contact settings; the CTA falls back to the contact form. */
  bookingUrl?: string;
}

// Used when the CMS has no nav links. Order follows docs/SITE_REVIEW_2026-10.md R7.
const fallbackNavLinks: Pick<NavLink, 'linkId' | 'title'>[] = [
  { linkId: '/services', title: 'Services' },
  { linkId: '/projects', title: 'Work' },
  { linkId: '/blog', title: 'Writing' },
  { linkId: 'about', title: 'About' },
];

const Navbar = ({ navLinks = [], bookingUrl }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  // Contact is rendered as the CTA button, so drop it from the text links.
  const links = (navLinks.length > 0 ? navLinks : fallbackNavLinks).filter(
    (link) => link.linkId !== 'contact'
  );

  const getHref = (linkId: string) => {
    if (linkId.startsWith('/')) return linkId;
    return pathname === '/' ? `#${linkId}` : `/#${linkId}`;
  };

  const isActive = (linkId: string) =>
    linkId.startsWith('/') && linkId !== '/' && pathname.startsWith(linkId);

  const cta = bookingUrl
    ? { href: bookingUrl, label: 'Book a call', external: true }
    : { href: pathname === '/' ? '#contact' : '/#contact', label: 'Start a project', external: false };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center h-16 fixed top-0 z-30 bg-primary/80 backdrop-blur-lg border-b border-fg/[0.07]`}>
      <div className="w-full flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2" onClick={() => setToggle(false)}>
          {/* Logo artwork is light blue; darken it on the light theme */}
          <Image
            src="/images/logo.svg"
            alt=""
            width={28}
            height={28}
            className="object-contain brightness-[0.35] dark:brightness-100"
          />
          <span className="text-fg text-[16px] font-semibold tracking-[-0.01em]">Santosh Pandey</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-7">
          <ul className="list-none flex flex-row gap-7">
            {links.map((link) => (
              <li key={link.linkId}>
                <Link
                  href={getHref(link.linkId)}
                  className={`${isActive(link.linkId) ? 'text-fg' : 'text-secondary'} hover:text-fg text-[14px] font-medium transition-colors`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={cta.href}
            {...(cta.external && { target: '_blank', rel: 'noreferrer' })}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-strong"
          >
            {cta.label}
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex flex-1 justify-end items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center"
            aria-label={toggle ? 'Close menu' : 'Open menu'}
            aria-expanded={toggle}
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <X className="h-6 w-6 text-fg" /> : <Menu className="h-6 w-6 text-fg" />}
          </button>

          <div
            className={`${toggle ? 'flex' : 'hidden'} p-5 bg-tertiary shadow-lift absolute top-16 right-0 mx-4 my-2 min-w-[200px] z-10 rounded-xl border border-fg/10`}
          >
            <ul className="list-none flex items-start flex-col gap-4 w-full">
              {links.map((link) => (
                <li key={link.linkId} className="text-secondary hover:text-fg font-medium text-[16px]">
                  <Link href={getHref(link.linkId)} onClick={() => setToggle(false)}>
                    {link.title}
                  </Link>
                </li>
              ))}
              <li className="w-full pt-2 border-t border-fg/10">
                <a
                  href={cta.href}
                  {...(cta.external && { target: '_blank', rel: 'noreferrer' })}
                  onClick={() => setToggle(false)}
                  className="block rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  {cta.label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
