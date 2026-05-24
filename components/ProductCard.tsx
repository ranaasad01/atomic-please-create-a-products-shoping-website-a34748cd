"use client";
import Link from "next/link";
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import StarRating from "./StarRating";
import Badge from "./Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const inWishlist = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
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
          onClick={() => toggleItem(product)}
          className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={inWishlist ? "text-red-500 fill-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide mb-1 capitalize">
          {product.category.replace("-", " ")}
        </p>
        <Link href={"/products/" + product.id}>
          <h3 className="text-gray-900 font-semibold text-sm leading-snug mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
            aria-label={"Add " + product.name + " to cart"}
          >
            <ShoppingCart size={14} />
            {product.inStock ? "Add" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
