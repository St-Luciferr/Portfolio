'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { styles } from '@/lib/styles';
import type { NavLink } from '@/types/frontend';

interface NavbarProps {
  navLinks?: NavLink[];
}

const fallbackNavLinks: Pick<NavLink, 'linkId' | 'title'>[] = [
  { linkId: 'about', title: 'About' },
  { linkId: 'work', title: 'Work' },
  { linkId: '/projects', title: 'Projects' },
  { linkId: 'contact', title: 'Contact' },
];

const Navbar = ({ navLinks = [] }: NavbarProps) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const cmsLinks = navLinks.length > 0 ? navLinks : fallbackNavLinks;
  const withProjects = cmsLinks.some(
    (link) => link.linkId === '/projects' || link.linkId === 'projects'
  )
    ? cmsLinks
    : [
        ...cmsLinks.slice(0, 2),
        { id: 'generated-projects', linkId: '/projects', title: 'Projects' },
        ...cmsLinks.slice(2),
      ];
  const links = withProjects.some(
    (link) => link.linkId === '/blog' || link.linkId === 'blog'
  )
    ? withProjects
    : [
        ...withProjects.slice(0, withProjects.length - 1),
        { id: 'generated-blog', linkId: '/blog', title: 'Blog' },
        ...withProjects.slice(withProjects.length - 1),
      ];

  const getHref = (linkId: string) => {
    if (linkId === 'projects') {
      return '/projects';
    }

    if (linkId.startsWith('/')) {
      return linkId;
    }

    return pathname === '/' ? `#${linkId}` : `/#${linkId}`;
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex pt-2">
            Santosh&nbsp;
            <span className="sm:block hidden">| Portfolio</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {links.map((link) => (
            <li
              key={link.linkId}
              className={`${
                active === link.title ? 'text-white' : 'text-secondary'
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <Link href={getHref(link.linkId)}>{link.title}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <Image
            src={toggle ? '/images/close.svg' : '/images/menu.svg'}
            alt="menu"
            width={28}
            height={28}
            className="object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {links.map((link) => (
                <li
                  key={link.linkId}
                  className={`${
                    active === link.title ? 'text-white' : 'text-secondary'
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <Link href={getHref(link.linkId)}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
