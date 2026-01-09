"use client"

import { useState, useMemo, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import ProductCard from "@/components/product-card"
import SearchBar from "@/components/search-bar"
import CategoryFilter from "@/components/category-filter"
import useFavorites from "@/hooks/use-favorites"
import useProducts from "@/hooks/use-products"

function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const searchParams = useSearchParams()
  const router = useRouter()

  const showFavoritesOnly = searchParams.get("view") === "favorites"
  const { products, loading, error, categories } = useProducts()
  const { favorites, toggleFavorite } = useFavorites()

  const toggleFavoritesView = () => {
    if (showFavoritesOnly) {
      router.push("/")
    } else {
      router.push("/?view=favorites")
    }
  }

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((product) => favorites.includes(product.id))
    }

    return filtered
  }, [products, searchQuery, selectedCategory, showFavoritesOnly, favorites])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Product Explorer</h1>
              <p className="mt-1 text-sm text-muted-foreground">Discover amazing products from our collection</p>
            </div>
            <button
              onClick={toggleFavoritesView}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all ${showFavoritesOnly
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-muted"
                }`}
            >
              <Heart className="h-5 w-5" fill={showFavoritesOnly ? "currentColor" : "none"} />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary"></div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
            <p className="font-medium text-destructive">Failed to load products</p>
            <p className="mt-1 text-sm text-destructive/80">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-foreground">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              </Link>
            ))}
          </div>
        )}

        {/* Results count */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}
