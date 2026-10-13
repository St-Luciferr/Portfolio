'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { styles } from '@/lib/styles';
import type { NavLink } from '@/types/frontend';

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
    <nav className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 bg-primary/90 backdrop-blur-md border-b border-white/5`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2" onClick={() => setToggle(false)}>
          <Image src="/images/logo.svg" alt="" width={32} height={32} className="object-contain" />
          <span className="text-white text-[17px] font-bold">Santosh Pandey</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-8">
            {links.map((link) => (
              <li key={link.linkId}>
                <Link
                  href={getHref(link.linkId)}
                  className={`${isActive(link.linkId) ? 'text-white' : 'text-secondary'} hover:text-white text-[15px] font-medium transition-colors`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={cta.href}
            {...(cta.external && { target: '_blank', rel: 'noreferrer' })}
            className="rounded-lg bg-[#7a4fd4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6a3fc4]"
          >
            {cta.label}
          </a>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label={toggle ? 'Close menu' : 'Open menu'}
            aria-expanded={toggle}
            onClick={() => setToggle(!toggle)}
          >
            <Image
              src={toggle ? '/images/close.svg' : '/images/menu.svg'}
              alt=""
              width={26}
              height={26}
              className="object-contain"
            />
          </button>

          <div
            className={`${toggle ? 'flex' : 'hidden'} p-6 black-gradient absolute top-16 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl border border-white/10`}
          >
            <ul className="list-none flex items-start flex-col gap-4 w-full">
              {links.map((link) => (
                <li key={link.linkId} className="text-secondary hover:text-white font-medium text-[16px]">
                  <Link href={getHref(link.linkId)} onClick={() => setToggle(false)}>
                    {link.title}
                  </Link>
                </li>
              ))}
              <li className="w-full pt-2 border-t border-white/10">
                <a
                  href={cta.href}
                  {...(cta.external && { target: '_blank', rel: 'noreferrer' })}
                  onClick={() => setToggle(false)}
                  className="block rounded-lg bg-[#7a4fd4] px-4 py-2 text-center text-sm font-semibold text-white"
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
