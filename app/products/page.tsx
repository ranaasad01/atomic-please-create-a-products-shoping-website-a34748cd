'use client';
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const ITEMS_PER_PAGE = 8;

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200 – $500", min: 200, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialBadge = searchParams.get("badge") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedBadge, setSelectedBadge] = useState(initialBadge);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBadge) {
      result = result.filter((p) => p.badge === selectedBadge);
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [search, selectedCategory, selectedPriceRange, selectedBadge, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedPriceRange(null);
    setSelectedBadge("");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const hasFilters = search || selectedCategory || selectedPriceRange !== null || selectedBadge;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">All Products</h1>
        <p className="text-gray-500">
          Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search + Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:border-indigo-300 transition-colors lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasFilters && <span className="w-2 h-2 bg-indigo-600 rounded-full" />}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={"w-64 shrink-0 " + (filtersOpen ? "block" : "hidden lg:block")}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">Filters</h3>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
              <div className="space-y-2">
                <button
                  onClick={() => { setSelectedCategory(""); setCurrentPage(1); }}
                  className={"w-full text-left text-sm px-3 py-2 rounded-lg transition-colors " + (!selectedCategory ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50")}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); }}
                    className={"w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-between " + (selectedCategory === cat.slug ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50")}
                  >
                    <span>{cat.icon} {cat.name}</span>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
              <div className="space-y-2">
                <button
                  onClick={() => { setSelectedPriceRange(null); setCurrentPage(1); }}
                  className={"w-full text-left text-sm px-3 py-2 rounded-lg transition-colors " + (selectedPriceRange === null ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50")}
                >
                  All Prices
                </button>
                {priceRanges.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => { setSelectedPriceRange(i); setCurrentPage(1); }}
                    className={"w-full text-left text-sm px-3 py-2 rounded-lg transition-colors " + (selectedPriceRange === i ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50")}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Badge Filter */}
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Deals</h4>
              <div className="space-y-2">
                {["", "Sale", "New", "Hot"].map((badge) => (
                  <button
                    key={badge || "all"}
                    onClick={() => { setSelectedBadge(badge); setCurrentPage(1); }}
                    className={"w-full text-left text-sm px-3 py-2 rounded-lg transition-colors " + (selectedBadge === badge ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-50")}
                  >
                    {badge || "All Deals"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearFilters}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={"w-10 h-10 rounded-xl text-sm font-semibold transition-colors " + (currentPage === page ? "bg-indigo-600 text-white" : "border border-gray-200 text-gray-700 hover:bg-gray-50")}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">All Products</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
