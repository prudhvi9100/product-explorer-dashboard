"use client"

import { Heart } from "lucide-react"

import { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted p-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="h-48 w-full object-contain transition-transform group-hover:scale-105"
        />
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleFavorite()
          }}
          className={`absolute right-3 top-3 rounded-full p-2 transition-all ${isFavorite ? "bg-accent text-accent-foreground" : "bg-background/80 text-foreground hover:bg-background"
            }`}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category */}
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{product.category}</div>

        {/* Title */}
        <h3 className="line-clamp-2 font-semibold text-foreground group-hover:text-primary">{product.title}</h3>

        {/* Price */}
        <div className="mt-auto">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
