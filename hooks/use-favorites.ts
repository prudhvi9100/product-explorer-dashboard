"use client"

import { useFavoritesContext } from "@/context/favorites-context"

export default function useFavorites() {
  return useFavoritesContext()
}
