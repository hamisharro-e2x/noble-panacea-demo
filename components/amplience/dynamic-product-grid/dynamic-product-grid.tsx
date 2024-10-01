'use client';

import { useEffect, useState } from 'react';

import { Product } from '~/components/product-card';
import { ProductCardCarousel } from '~/components/product-card-carousel';

interface DynamicProductGridProps {
  limit?: number;
  category: string;
  title?: string;
}

const DynamicProductGrid = ({ limit = 10, category, title = '' }: DynamicProductGridProps) => {
  const [hydratedProducts, setHydratedProducts] = useState<Array<Partial<Product>>>([]);

  useEffect(() => {
    const load = async () => {
      if (category) {
        const response = await fetch(`/api/products-in-category/${category}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const allProducts = await response.json();
        const products = Array.isArray(allProducts) ? allProducts.slice(0, limit) : [];

        setHydratedProducts(products);
      }
    };

    void load();
  }, [category, limit]);

  return (
    <ProductCardCarousel
      products={hydratedProducts}
      showBrand={false}
      showCart={false}
      showCompare={false}
      showReviews={false}
      title={title}
    />
  );
};

export default DynamicProductGrid;
