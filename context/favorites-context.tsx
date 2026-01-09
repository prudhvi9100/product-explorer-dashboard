"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface FavoritesContextType {
    favorites: number[]
    toggleFavorite: (productId: number) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<number[]>([])
    const [isHydrated, setIsHydrated] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("favorites")
        if (stored) {
            try {
                setFavorites(JSON.parse(stored))
            } catch (err) {
                console.error("Failed to parse favorites", err)
            }
        }
        setIsHydrated(true)
    }, [])

    // Save to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }
    }, [favorites, isHydrated])

    const toggleFavorite = (productId: number) => {
        setFavorites((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        )
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavoritesContext() {
    const context = useContext(FavoritesContext)
    if (context === undefined) {
        throw new Error("useFavoritesContext must be used within a FavoritesProvider")
    }
    return context
}
