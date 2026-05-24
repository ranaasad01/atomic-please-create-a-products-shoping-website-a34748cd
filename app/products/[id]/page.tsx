"use client";
import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, ArrowLeft, Truck, Shield, RefreshCw, Share2, Minus, Plus } from 'lucide-react';
import { getProductById, getRelatedProducts } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import StarRating from "@/components/StarRating";
import Badge from "@/components/Badge";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = getProductById(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  if (!product) return notFound();

  const relatedProducts = getRelatedProducts(product);
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square mb-4">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge type={product.badge} />
              </div>
            )}
            {discount && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{discount}% OFF
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={"w-20 h-20 rounded-xl overflow-hidden border-2 transition-all " + (selectedImage === i ? "border-indigo-600 shadow-md" : "border-gray-200 hover:border-gray-300")}
                >
                  <img src={img} alt={"View " + (i + 1)} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mb-2 capitalize">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <span className="text-sm text-gray-400">|</span>
            <span className={"text-sm font-semibold " + (product.inStock ? "text-green-600" : "text-red-500")}>
              {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount && (
              <span className="bg-orange-100 text-orange-700 text-sm font-bold px-2 py-0.5 rounded-lg">
                Save {discount}%
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full capitalize">
                {tag}
              </span>
            ))}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={"flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all " + (addedToCart ? "bg-green-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-300")}
            >
              <ShoppingCart size={20} />
              {addedToCart ? "Added to Cart! ✓" : product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={() => toggleItem(product)}
              className={"flex items-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm transition-all " + (inWishlist ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500")}
            >
              <Heart size={18} className={inWishlist ? "fill-red-500" : ""} />
              {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 font-medium text-sm transition-colors">
              <Share2 size={18} />
              Share
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl">
            {[
              { icon: <Truck size={18} className="text-indigo-600" />, label: "Free Shipping", sub: "Orders over $50" },
              { icon: <Shield size={18} className="text-indigo-600" />, label: "Secure Pay", sub: "100% protected" },
              { icon: <RefreshCw size={18} className="text-indigo-600" />, label: "Easy Returns", sub: "30-day policy" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-1">
                {item.icon}
                <span className="text-xs font-semibold text-gray-800">{item.label}</span>
                <span className="text-xs text-gray-400">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Customer Reviews
          <span className="ml-3 text-lg font-normal text-gray-400">({product.reviewCount})</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {product.reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover bg-indigo-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(review.author) + "&background=6366f1&color=fff";
                    }}
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.author}</div>
                    <div className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} showCount={false} size="sm" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Back Link */}
      <div className="mt-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
      </div>
    </div>
  );
}
