"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from 'lucide-react';
import { categories } from "@/lib/mockData";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
    badge: "none",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Product added successfully! (Demo only)");
    router.push("/products");
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder-gray-400";

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
          <div className="w-px h-5 bg-gray-200" />
          <h1 className="text-xl font-extrabold text-gray-900">Add Product</h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Plus size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">New Product</h2>
              <p className="text-sm text-gray-500">Fill in the details below to add a new product.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Wireless Noise-Cancelling Headphones"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Describe the product in detail..."
                value={form.description}
                onChange={handleChange}
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className={labelClass}>
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="stock" className={labelClass}>
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  required
                  min="0"
                  step="1"
                  placeholder="0"
                  value={form.stock}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className={labelClass}>
                Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Badge */}
            <div>
              <label htmlFor="badge" className={labelClass}>
                Badge
              </label>
              <select
                id="badge"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="none">None</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Popular">Popular</option>
                <option value="Hot">Hot</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md shadow-indigo-200"
              >
                <Plus size={18} />
                Add Product
              </button>
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
