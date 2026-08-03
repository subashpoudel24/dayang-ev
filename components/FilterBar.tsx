import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  maxPrice: number;
  onMaxPriceChange: (val: number) => void;
  minRange: number;
  onMinRangeChange: (val: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetFilters: () => void;
  resultsCount: number;
}

const CATEGORIES = ['All', 'Sport', 'Commuter'];
const PRICE_CEILING = 500000;

const selectClasses =
  'appearance-none rounded-full border border-line bg-page-alt px-4 py-2.5 pr-9 text-xs font-medium text-ink ' +
  'transition-colors hover:border-ink/20 focus:border-brand-600 focus:outline-none cursor-pointer ' +
  "bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%237a7a8c' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")] bg-[length:14px] bg-[right_0.85rem_center] bg-no-repeat";

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  minRange,
  onMinRangeChange,
  sortBy,
  onSortChange,
  onResetFilters,
  resultsCount,
}) => {
  const hasFilters =
    Boolean(searchQuery) ||
    selectedCategory !== 'All' ||
    maxPrice < PRICE_CEILING ||
    minRange > 0;

  return (
    <div className="rounded-3xl border border-line bg-card shadow-card p-4 sm:p-5 space-y-5">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by model name…"
            aria-label="Search models"
            className="w-full rounded-full border border-line bg-page-alt py-2.5 pl-11 pr-10 text-sm text-ink placeholder-faint transition-colors hover:border-ink/20 focus:border-brand-600 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted transition-colors hover:bg-line hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div
          className="flex items-center gap-1 rounded-full border border-line bg-page-alt p-1"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              aria-pressed={selectedCategory === cat}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-brand'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort models"
          className={selectClasses}
        >
          <option value="popular">Most popular</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="range-desc">Longest range</option>
        </select>
      </div>

      <div className="rule-fade" />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-muted">
              <SlidersHorizontal className="h-3 w-3" />
              Max price
            </span>
            <span className="font-semibold text-ink tabular-nums">
              Rs. {maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={100000}
            max={PRICE_CEILING}
            step={5000}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            aria-label="Maximum price"
            className="w-full"
          />
        </div>

        <div className="space-y-2.5 sm:w-48">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Min range</span>
            <span className="font-semibold text-ink">
              {minRange > 0 ? `${minRange} km+` : 'Any'}
            </span>
          </div>
          <select
            value={minRange}
            onChange={(e) => onMinRangeChange(Number(e.target.value))}
            aria-label="Minimum range"
            className={`${selectClasses} w-full`}
          >
            <option value="0">All ranges</option>
            <option value="80">80+ km</option>
            <option value="90">90+ km</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-xs text-muted tabular-nums">
            {resultsCount} model{resultsCount === 1 ? '' : 's'}
          </span>
          {hasFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
