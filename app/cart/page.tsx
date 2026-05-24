"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from "@/store/cartStore";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet. Explore our products and find something you love!"
        actionLabel="Start Shopping"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-500 mt-1">{getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemTotal = item.product.price * item.quantity;
            return (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={"/products/" + item.product.id} className="shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-50"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide capitalize mb-0.5">
                        {item.product.category.replace("-", " ")}
                      </p>
                      <Link href={"/products/" + item.product.id}>
                        <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2 text-sm">
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={14} className="text-gray-600" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={14} className="text-gray-600" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">${itemTotal.toFixed(2)}</div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-gray-400">${item.product.price.toFixed(2)} each</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Promo Code */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Tag size={18} className="text-indigo-600" />
              Promo Code
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingBag size={22} className="text-indigo-600" />
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium text-gray-900"}>
                  {shipping === 0 ? "FREE" : "$" + shipping.toFixed(2)}
                </span>
              </div>
              {shipping === 0 && (
                <div className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  🎉 You qualify for free shipping!
                </div>
              )}
              {shipping > 0 && (
                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-extrabold text-xl text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <Link
              href="/products"
              className="w-full flex items-center justify-center gap-2 mt-3 border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 font-medium py-3 rounded-xl transition-colors text-sm"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>🔒 Secure Checkout</span>
              <span>•</span>
              <span>💳 All cards accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
