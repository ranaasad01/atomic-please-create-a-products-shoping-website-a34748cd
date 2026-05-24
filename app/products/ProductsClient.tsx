"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialBadge = searchParams.get("badge") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBadge, setSelectedBadge] = useState(initialBadge);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBadge) {
      result = result.filter((p) => p.badge === selectedBadge);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [search, selectedCategory, selectedBadge, sort, priceRange]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBadge("");
    setPriceRange([0, 1000]);
    setSort("featured");
  };

  const hasFilters =
    search || selectedCategory || selectedBadge || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-1">{filtered.length} products found</p>
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={"flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-medium transition-colors " + (showFilters ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300")}
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasFilters && (
              <span className="w-2 h-2 bg-indigo-600 rounded-full" />
            )}
          </button>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ""}
                    onChange={() => setSelectedCategory("")}
                    className="text-indigo-600"
                  />
                  <span className="text-sm text-gray-700">All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm text-gray-700">
                      {cat.icon} {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Badge */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Badge</h3>
              <div className="space-y-2">
                {["", "Sale", "New", "Hot", "Limited"].map((badge) => (
                  <label key={badge} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="badge"
                      checked={selectedBadge === badge}
                      onChange={() => setSelectedBadge(badge)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm text-gray-700">{badge || "All"}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="sm:col-span-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Price Range: ${priceRange[0]} – ${priceRange[1]}
              </h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Min</label>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Max</label>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
              >
                <X size={14} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filter Pills */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("")}>
                <X size={12} />
              </button>
            </span>
          )}
          {selectedBadge && (
            <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {selectedBadge}
              <button onClick={() => setSelectedBadge("")}>
                <X size={12} />
              </button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
              &ldquo;{search}&rdquo;
              <button onClick={() => setSearch("")}>
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
          <button
            onClick={clearFilters}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
