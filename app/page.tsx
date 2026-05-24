"use client";

import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import { products, categories } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const saleProducts = products.filter((p) => p.badge === "Sale").slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>Trusted by 50,000+ happy customers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Shop the Best.{" "}
                <span className="text-orange-400">Save the Most.</span>
              </h1>
              <p className="text-lg text-indigo-200 leading-relaxed mb-8 max-w-lg">
                Discover thousands of premium products across electronics, fashion, home goods, and more — all at prices that won&apos;t break the bank. Free shipping on orders over $50.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
                >
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link
                  href="/products?badge=Sale"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl transition-all"
                >
                  View Deals
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="text-center">
                  <div className="text-2xl font-extrabold">50K+</div>
                  <div className="text-xs text-indigo-300">Customers</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-extrabold">10K+</div>
                  <div className="text-xs text-indigo-300">Products</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-extrabold">4.9★</div>
                  <div className="text-xs text-indigo-300">Avg Rating</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {products.slice(0, 4).map((product, i) => (
                <Link
                  key={product.id}
                  href={"/products/" + product.id}
                  className={"rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 " + (i % 2 === 1 ? "mt-8" : "")}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Truck size={22} />, title: "Free Shipping", desc: "On orders over $50" },
              { icon: <Shield size={22} />, title: "Secure Payment", desc: "100% protected" },
              { icon: <RefreshCw size={22} />, title: "Easy Returns", desc: "30-day return policy" },
              { icon: <Headphones size={22} />, title: "24/7 Support", desc: "Always here to help" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl shrink-0">{item.icon}</div>
                <div>
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-xs text-indigo-200">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-1">Find exactly what you&apos;re looking for</p>
          </div>
          <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1">
            All Categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={"/products?category=" + cat.slug}
              className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm text-gray-900">{cat.name}</div>
                <div className="text-xs text-gray-400">{cat.count} items</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Handpicked favorites just for you</p>
            </div>
            <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
            <div className="relative">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                LIMITED TIME
              </span>
              <h3 className="text-2xl font-extrabold mb-2">Summer Sale</h3>
              <p className="text-orange-100 text-sm mb-6">Up to 40% off on selected electronics and fashion items. Don&apos;t miss out!</p>
              <Link
                href="/products?badge=Sale"
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors"
              >
                Shop Sale <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
            <div className="relative">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                NEW ARRIVALS
              </span>
              <h3 className="text-2xl font-extrabold mb-2">Fresh Picks</h3>
              <p className="text-indigo-200 text-sm mb-6">Explore our latest collection of new products across all categories. Be the first to own them!</p>
              <Link
                href="/products?badge=New"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Explore New <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                🔥 Hot Deals
              </h2>
              <p className="text-gray-500 mt-1">Best prices on top-rated products</p>
            </div>
            <Link href="/products?badge=Sale" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1">
              All Deals <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-500 mt-2">Real reviews from real shoppers</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah M.",
              location: "New York, NY",
              rating: 5,
              comment: "ShopNest has completely changed how I shop online. The product quality is outstanding and delivery is always on time. Highly recommend!",
              avatar: "https://mormonartist.net/images/interviews/sarah-m-eden/sarah-m-eden-01.jpg",
            },
            {
              name: "James K.",
              location: "Austin, TX",
              rating: 5,
              comment: "I've been shopping here for over a year and I'm always impressed. Great prices, fast shipping, and excellent customer service.",
              avatar: "https://northerntransmissions.com/wp-content/uploads/2025/09/8a45e994-ac9e-45e5-eb7d-6387a2fd8b9a-1-1536x1016.png",
            },
            {
              name: "Emily R.",
              location: "Seattle, WA",
              rating: 5,
              comment: "The variety of products is amazing. I found everything I needed in one place. The checkout process is smooth and secure.",
              avatar: "https://m.media-amazon.com/images/M/MV5BZjliYzIwNzgtYTM3OS00YjBkLTgzYzYtZTA2MTdkNGMwNTdlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            },
          ].map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover bg-indigo-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(review.name) + "&background=6366f1&color=fff";
                  }}
                />
                <div>
                  <div className="font-semibold text-sm text-gray-900">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-3">Get Exclusive Deals in Your Inbox</h2>
          <p className="text-indigo-200 mb-8">
            Subscribe to our newsletter and be the first to know about new arrivals, flash sales, and exclusive member-only discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 text-sm outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
          <p className="text-xs text-indigo-300 mt-4">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
}
