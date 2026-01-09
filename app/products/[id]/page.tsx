"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Heart, Loader } from "lucide-react"
import useFavorites from "@/hooks/use-favorites"

import { Product } from "@/lib/types"
import { productSchema } from "@/lib/schemas"

export default function ProductDetails() {
  const params = useParams()
  const productId = Number(params.id)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(productId)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        if (!response.ok) throw new Error("Product not found")
        const rawData = await response.json()
        const data = productSchema.parse(rawData)
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </header>
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <Loader className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </header>
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
            <p className="font-medium text-destructive">Product not found</p>
            <p className="mt-1 text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </header>

      {/* Product Details */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="max-h-96 max-w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            {/* Category */}
            <div>
              <div className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                {product.category}
              </div>

              {/* Title */}
              <h1 className="mb-4 text-3xl font-bold text-foreground">{product.title}</h1>

              {/* Rating */}
              {product.rating && (
                <div className="mb-6 flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < Math.round(product.rating.rate) ? "text-accent" : "text-muted"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="mb-6 leading-relaxed text-foreground">{product.description}</p>
            </div>

            {/* Price and Actions */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleFavorite(productId)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-all ${isFavorite
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "border border-border bg-card text-foreground hover:bg-muted"
                    }`}
                >
                  <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                  {isFavorite ? "Liked" : "Add to Favorites"}
                </button>
                <button className="flex-1 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
