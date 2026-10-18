import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
    </>
  );
}
