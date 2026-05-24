"use client";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import StarRating from "@/components/StarRating";
import Badge from "@/components/Badge";
import EmptyState from "@/components/EmptyState";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  const handleMoveToCart = (productId: number) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      addToCart(item.product);
      removeItem(productId);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon="💝"
        title="Your wishlist is empty"
        description="Save your favorite products to your wishlist and come back to them anytime. Start exploring our collection!"
        actionLabel="Explore Products"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Heart size={30} className="text-red-500 fill-red-500" />
            My Wishlist
          </h1>
          <p className="text-gray-500 mt-1">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
        >
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => {
          const { product } = item;
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : null;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative bg-gray-50 aspect-square overflow-hidden">
                <Link href={"/products/" + product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge type={product.badge} />
                  </div>
                )}
                {discount && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{discount}%
                  </div>
                )}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide mb-1 capitalize">
                  {product.category.replace("-", " ")}
                </p>
                <Link href={"/products/" + product.id}>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />

                <div className="flex items-baseline gap-2 mt-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(product.id)}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    <ShoppingCart size={14} />
                    {product.inStock ? "Move to Cart" : "Out of Stock"}
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2.5 border border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-xl transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 size={14} className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2 text-center">
                  Added {new Date(item.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Move All to Cart */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => {
            items.forEach((item) => {
              if (item.product.inStock) {
                addToCart(item.product);
                removeItem(item.product.id);
              }
            });
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-indigo-200"
        >
          <ShoppingCart size={20} />
          Move All In-Stock Items to Cart
        </button>
      </div>
    </div>
  );
}
