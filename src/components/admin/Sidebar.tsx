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
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/admin/dashboard/overview',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    href: '/admin/dashboard/projects',
    icon: FileText,
  },
  {
    name: 'Experiences',
    href: '/admin/dashboard/experiences',
    icon: Briefcase,
  },
  {
    name: 'Technologies',
    href: '/admin/dashboard/technologies',
    icon: Code,
  },
  {
    name: 'Services',
    href: '/admin/dashboard/services',
    icon: Wrench,
  },
  {
    name: 'Settings',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Portfolio CMS</h1>
        <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          v1.0.0 • Built with Next.js
        </p>
      </div>
    </div>
  );
}
