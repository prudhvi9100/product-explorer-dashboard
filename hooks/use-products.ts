"use client"

import { useState, useEffect } from "react"

import { Product } from "@/lib/types"
import { productSchema } from "@/lib/schemas"

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  categories: string[]
}

export default function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        if (!response.ok) throw new Error("Failed to fetch products")

        const rawData = await response.json()
        const data = productSchema.array().parse(rawData)
        setProducts(data)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)))
        setCategories(uniqueCategories as string[])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error, categories }
}
