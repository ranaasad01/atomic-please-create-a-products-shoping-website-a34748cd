"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, WishlistItem } from "@/lib/types";

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({
            items: [
              ...state.items,
              { product, addedAt: new Date().toISOString() },
            ],
          }));
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      isInWishlist: (productId) =>
        get().items.some((i) => i.product.id === productId),

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      clearWishlist: () => set({ items: [] }),
    }),
    { name: "wishlist-storage" }
  )
);
