'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  Settings,
  Wrench,
  BookOpen,
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/admin/overview',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    href: '/admin/projects',
    icon: FileText,
  },
  {
    name: 'Experiences',
    href: '/admin/experiences',
    icon: Briefcase,
  },
  {
    name: 'Technologies',
    href: '/admin/technologies',
    icon: Code,
  },
  {
    name: 'Services',
    href: '/admin/services',
    icon: Wrench,
  },
  {
    name: 'Blog',
    href: '/admin/blog',
    icon: BookOpen,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col shadow-xl">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Portfolio CMS</h1>
        <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          v1.0.0 • Built with Next.js
        </p>
      </div>
    </div>
  );
}
