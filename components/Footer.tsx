"use client";

import Link from "next/link";

import { Package, Mail, Phone, MapPin, Globe as Facebook, MessageCircle as Twitter, Camera as Instagram, Code2 as Github } from 'lucide-react';

export default function Footer() {

  return (

    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}

          <div>

            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">

              <Package size={28} className="text-indigo-400" />

              Asad&apos;s shop

            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">

              Your one-stop destination for premium products at unbeatable prices. Shop with confidence and enjoy fast, free shipping on orders over $50.

            </p>

            <div className="flex items-center gap-3">

              <a href="#" className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors" aria-label="Facebook">

                <Facebook size={16} />

              </a>

              <a href="#" className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors" aria-label="Twitter">

                <Twitter size={16} />

              </a>

              <a href="#" className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors" aria-label="Instagram">

                <Instagram size={16} />

              </a>

              <a href="#" className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors" aria-label="Github">

                <Github size={16} />

              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2.5">

              {[

                { href: "/", label: "Home" },

                { href: "/products", label: "All Products" },

                { href: "/cart", label: "Shopping Cart" },

                { href: "/wishlist", label: "Wishlist" },

                { href: "/account", label: "My Account" },

              ].map((link) => (

                <li key={link.href}>

                  <Link

                    href={link.href}

                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"

                  >

                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h3 className="text-white font-semibold mb-4">Categories</h3>

            <ul className="space-y-2.5">

              {[

                { label: "Electronics", slug: "electronics" },

                { label: "Clothing", slug: "clothing" },

                { label: "Home & Garden", slug: "home-garden" },

                { label: "Sports", slug: "sports" },

                { label: "Beauty", slug: "beauty" },

                { label: "Books", slug: "books" },

              ].map((cat) => (

                <li key={cat.slug}>

                  <Link

                    href={"/products?category=" + cat.slug}

                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"

                  >

                    {cat.label}

                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white font-semibold mb-4">Contact Us</h3>

            <ul className="space-y-3">

              <li className="flex items-start gap-3 text-sm text-gray-400">

                <MapPin size={16} className="text-indigo-400 mt-0.5 shrink-0" />

                <span>123 Commerce Street, New York, NY 10001</span>

              </li>

              <li className="flex items-center gap-3 text-sm text-gray-400">

                <Phone size={16} className="text-indigo-400 shrink-0" />

                <span>+1 (555) 123-4567</span>

              </li>

              <li className="flex items-center gap-3 text-sm text-gray-400">

                <Mail size={16} className="text-indigo-400 shrink-0" />

                <span>support@asadsshop.com</span>

              </li>

            </ul>

          </div>

        </div>

        {/* Bottom Bar */}

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">

            &copy; {new Date().getFullYear()} Asad&apos;s shop. All rights reserved.

          </p>

          <div className="flex items-center gap-6">

            <Link href="/privacy" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">Privacy Policy</Link>

            <Link href="/terms" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">Terms of Service</Link>

            <Link href="/sitemap" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors">Sitemap</Link>

          </div>

        </div>

      </div>

    </footer>

  );

}
