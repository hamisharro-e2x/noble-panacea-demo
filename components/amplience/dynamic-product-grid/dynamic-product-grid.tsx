'use client';

import { useEffect, useState } from 'react';

import { Product } from '~/components/product-card';
import { ProductCardCarousel, ProductCardCarouselSingle } from '~/components/product-card-carousel';

export interface DynamicProductContentProps {
  limit?: number;
  category: string;
  title?: string;
  className?: string;
  single?: boolean;
}

const DynamicProductGrid = ({
  limit = 10,
  category,
  title = '',
  className,
  single = true,
}: DynamicProductContentProps) => {
  const [hydratedProducts, setHydratedProducts] = useState<Array<Partial<Product>>>([]);

  const Carousel = single ? ProductCardCarouselSingle : ProductCardCarousel;

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
    <Carousel
      className={className}
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
