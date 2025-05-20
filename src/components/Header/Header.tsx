'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const link = [
  { href: '/popular', label: "Popular" },
  { href: '/top-rated', label: "Top Rated" },
  { href: '/now-playing', label: "Now Playing" },
  { href: '/my-favorites', label: "My Favorites" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo / App name */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-blue-800 transition-colors">
          MOVIESDB
        </Link>

        {/* Navigation links */}
        <nav className="flex gap-8">
          {link.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "text-sm font-medium transition-all hover:text-blue-600 hover:underline underline-offset-4",
                pathname === href ? "text-blue-600 underline" : "text-gray-600"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
