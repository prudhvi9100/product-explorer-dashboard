"use client"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory("all")}
        className={`rounded-full px-4 py-2 font-medium transition-all ${
          selectedCategory === "all"
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-foreground hover:bg-muted"
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`rounded-full px-4 py-2 font-medium transition-all capitalize ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-foreground hover:bg-muted"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
