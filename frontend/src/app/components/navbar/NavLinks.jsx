'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    { href: '/browse-kits', label: 'Browse Kits' },
    { href: '/aboutus', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' }
  ];

  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm font-medium transition-colors hover:text-pink-600 ${
            pathname === href ? 'text-pink-600' : 'text-gray-700'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};