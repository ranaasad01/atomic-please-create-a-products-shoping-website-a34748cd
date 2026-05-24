"use client";

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function StarRating({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
}: StarRatingProps) {
  const sizes = { sm: 12, md: 16, lg: 20 };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
  const starSize = sizes[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star <= rating + 0.5;
          return (
            <span key={star} className="relative inline-block">
              <Star size={starSize} className="text-gray-200" fill="currentColor" />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : "50%" }}
                >
                  <Star size={starSize} className="text-amber-400" fill="currentColor" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className={textSizes[size] + " text-gray-500 font-medium"}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-gray-400 font-normal ml-1">
              ({reviewCount.toLocaleString()})
            </span>
          )}
        </span>
      )}
    </div>
  );
}
