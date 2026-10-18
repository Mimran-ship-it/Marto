export type Category = {
  slug: string;
  name: string;
  href: string;
};

export type Subcategory = {
  slug: string;
  name: string;
  categorySlug: string;
};

export const CATEGORIES: Category[] = [
  { slug: "fruits-vegetables", name: "Fruits & Vegetables", href: "/shop/fruits-vegetables" },
  { slug: "dairy-eggs", name: "Dairy & Eggs", href: "/shop/dairy-eggs" },
  { slug: "bakery", name: "Bakery", href: "/shop/bakery" },
  { slug: "snacks-beverages", name: "Snacks & Beverages", href: "/shop/snacks-beverages" },
  { slug: "household", name: "Household", href: "/shop/household" },
  { slug: "personal-care", name: "Personal Care", href: "/shop/personal-care" },
];

export const SUBCATEGORIES: Subcategory[] = [
  { slug: "fresh-fruits", name: "Fresh Fruits", categorySlug: "fruits-vegetables" },
  { slug: "fresh-vegetables", name: "Fresh Vegetables", categorySlug: "fruits-vegetables" },
  { slug: "herbs-greens", name: "Herbs & Greens", categorySlug: "fruits-vegetables" },
  { slug: "organic-produce", name: "Organic Produce", categorySlug: "fruits-vegetables" },
  { slug: "exotic-fruits", name: "Exotic Fruits", categorySlug: "fruits-vegetables" },
  { slug: "pre-cut", name: "Pre-Cut & Ready to Eat", categorySlug: "fruits-vegetables" },
];

export const PRICE_FILTERS = [
  { id: "under-100", label: "Under Rs. 100", min: 0, max: 99 },
  { id: "100-200", label: "Rs. 100 – Rs. 200", min: 100, max: 200 },
  { id: "200-300", label: "Rs. 200 – Rs. 300", min: 200, max: 300 },
  { id: "300-500", label: "Rs. 300 – Rs. 500", min: 300, max: 500 },
  { id: "above-500", label: "Above Rs. 500", min: 501, max: Infinity },
] as const;

export const BRANDS = [
  "Local Farms",
  "Fresh & Pure",
  "Organic Valley",
  "Nature's Best",
  "Olper's",
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop/fruits-vegetables", label: "Fruits & Vegetables" },
  { href: "/shop/dairy-eggs", label: "Dairy & Eggs" },
  { href: "/shop/bakery", label: "Bakery" },
  { href: "/shop/snacks-beverages", label: "Snacks & Beverages" },
  { href: "/shop/household", label: "Household" },
  { href: "/shop/personal-care", label: "Personal Care" },
] as const;

export const HEADER_LINKS: {
  href: string;
  label: string;
  hasDropdown?: boolean;
}[] = [
  { href: "/shop", label: "Categories", hasDropdown: true },
  { href: "/offers", label: "Offers" },
  { href: "/best-selling", label: "Best Selling" },
  { href: "/about", label: "About Us" },
];
