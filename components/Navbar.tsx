"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, User, Search, Menu, X, Package } from 'lucide-react';
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={
        "sticky top-0 z-50 transition-all duration-300 " +
        (scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm border-b border-gray-100")
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Package size={28} className="text-indigo-600" />
            <span className="hidden sm:block">ShopNest</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "text-sm font-medium transition-colors " +
                  (isActive(link.href)
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-0.5"
                    : "text-gray-600 hover:text-indigo-600")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = "/products?search=" + encodeURIComponent(searchQuery);
                    }
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  className="bg-transparent text-sm outline-none w-40 text-gray-800"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href={isAuthenticated ? "/account" : "/login"}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 rounded-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors " +
                  (isActive(link.href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50")
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isAuthenticated ? "/account" : "/login"}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              {isAuthenticated ? "My Account" : "Login / Sign Up"}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
