import { Star } from "lucide-react";
import { formatReviewCount } from "@/lib/format";

type StarRatingProps = {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
};

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className = "",
}: StarRatingProps) {
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Star className={`${icon} fill-amber-400 text-amber-400`} aria-hidden />
      <span className="text-sm font-medium text-gray-800">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted">
          ({formatReviewCount(reviewCount)}
          {size === "md" ? " reviews" : ""})
        </span>
      )}
    </div>
  );
}
