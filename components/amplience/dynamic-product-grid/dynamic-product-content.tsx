'use client';

import { useEffect, useState } from 'react';

import ContentProductCarousel from '~/components/content-product-carousel';
import { Product } from '~/components/product-card';

interface DynamicProductGridProps {
  limit?: number;
  productIds: string[];
  content: string;
  isDark?: boolean;
}

const DynamicProductContent = ({
  limit = 10,
  productIds,
  content,
  isDark,
}: DynamicProductGridProps) => {
  const [hydratedProducts, setHydratedProducts] = useState<Array<Partial<Product>>>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/products/${productIds.join(',')}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const allProducts = await response.json();
      const products = Array.isArray(allProducts) ? allProducts.slice(0, limit) : [];

      setHydratedProducts(products);
    };

    void load();
  }, [productIds, limit]);

  return (
    <ContentProductCarousel
      content={content}
      isDark={isDark}
      products={hydratedProducts}
      showBrand={false}
      showCart={false}
      showCompare={false}
      showReviews={false}
    />
  );
};

export default DynamicProductContent;
