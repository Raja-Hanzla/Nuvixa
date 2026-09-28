import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CategoriesGrid />
      <BlogTeaser />
      <CtaBanner />
    </>
  );
}

